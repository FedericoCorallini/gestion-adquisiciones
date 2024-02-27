package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.LicenciaFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.*;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import com.giuct.adquisiciones.repository.ILicenciaRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service("licencias")
public class LicenciaService extends AdquisicionService{

    private final ILicenciaRepository licenciaRepository;
    private final LicenciaFactory licenciaFactory;

    public LicenciaService(IFuenteRepository fuenteRepository, FinanciamientoService financiamientoService, ModelMapper modelMapper, ILicenciaRepository licenciaRepository, LicenciaFactory licenciaFactory) {
        super(fuenteRepository, financiamientoService, modelMapper);
        this.licenciaRepository = licenciaRepository;
        this.licenciaFactory = licenciaFactory;
    }

    @Override
    public AdquisicionDTO getAdquisicionById(Long id) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findByIdAndBorrado(id, false);
        if(licenciaOptional.isPresent()){
            return modelMapper.map(licenciaOptional.get(), AdquisicionDTO.class);
        }
        throw new InvalidAdquisicionException("La licencia solicitada no existe");
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Licencia> licenciaPage = licenciaRepository.findByBorrado(false, PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = licenciaPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, licenciaPage.getPageable(), licenciaPage.getTotalElements());
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Licencia> licenciaPage = licenciaRepository.findByFuenteFinanciamientoAndBorrado(fuenteFinanciamiento, false, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = licenciaPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, licenciaPage.getPageable(), licenciaPage.getTotalElements());
    }

    @Override
    public AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Licencia l = licenciaFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-l.getCosto());
        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }
        validarFechas(adquisicionDTO.getAnio(),adquisicionDTO.getFechaOtorgamiento(),adquisicionDTO.getFechaVencimiento());
        this.fuenteRepository.save(fuenteFinanciamiento);
        licenciaRepository.save(l);
        return adquisicionDTO;
    }

    @Override
    public AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findByIdAndBorrado(id, false);

        if(licenciaOptional.isPresent()){
            Licencia l = licenciaOptional.get();
            FuenteFinanciamiento fuenteFinanciamiento = l.getFuenteFinanciamiento();

            fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()+l.getCosto()-adquisicionDTO.getCosto());

            if (fuenteFinanciamiento.getMonto() < 0){
                throw new InvalidAdquisicionException("Fondos insuficientes");
            }
            validarFechas(adquisicionDTO.getAnio(),adquisicionDTO.getFechaOtorgamiento(),adquisicionDTO.getFechaVencimiento());
            l.setAnio(adquisicionDTO.getAnio());
            l.setFabricante(adquisicionDTO.getFabricante());
            l.setNombre(adquisicionDTO.getNombre());
            l.setFechaOtorgamiento(adquisicionDTO.getFechaOtorgamiento());
            l.setFechaVencimiento(adquisicionDTO.getFechaVencimiento());
            l.setNumeroRelease(adquisicionDTO.getNumeroRelease());
            l.setVersion(adquisicionDTO.getVersion());
            l.setCosto(adquisicionDTO.getCosto());
            l.setDescripcion(adquisicionDTO.getDescripcion());

            this.fuenteRepository.save(fuenteFinanciamiento);
            licenciaRepository.save(l);

        } else {
            throw new InvalidAdquisicionException("La licencia que desea modificar no existe");
        }

        return adquisicionDTO;
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findByIdAndBorrado(id, false);

        if (licenciaOptional.isEmpty()) {
            throw new InvalidAdquisicionException("La adquisicion no existe");
        }

        Licencia licencia = licenciaOptional.get();
        FuenteFinanciamiento fuenteFinanciamiento = licencia.getFuenteFinanciamiento();
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + licencia.getCosto());
        licencia.setBorrado(true);
        licenciaRepository.save(licencia);
        fuenteRepository.save(fuenteFinanciamiento);
    }

    public void validarFechas(LocalDate anio, LocalDate fechaOtorgamiento, LocalDate fechaVencimiento){
        if (anio.isAfter(LocalDate.now())){
            throw new InvalidAdquisicionException("El año de la licencia no puede ser posterior al año corriente");
        }
        if (fechaOtorgamiento.isBefore(anio)){
            throw new InvalidAdquisicionException("La fecha de otorgamiento no puede ser anterior al año de la licencia");
        }
        if (fechaOtorgamiento.isAfter(LocalDate.now())){
            throw new InvalidAdquisicionException("La fecha de otorgamiento no puede ser posterior a la fecha actual");
        }
        if (fechaOtorgamiento.isAfter(fechaVencimiento)){
            throw new InvalidAdquisicionException("La fecha de vencimiento no puede ser anterior a la fecha de otorgamiento");
        }
    }
}
