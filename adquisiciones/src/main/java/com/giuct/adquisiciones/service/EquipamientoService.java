package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.EquipamientoFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.*;
import com.giuct.adquisiciones.repository.IEquipamientoRepository;
import com.giuct.adquisiciones.repository.IFuenteRepository;
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

@Service("equipamientos")
public class EquipamientoService extends AdquisicionService{

    private final IEquipamientoRepository equipamientoRepository;
    private final EquipamientoFactory equipamientoFactory;

    public EquipamientoService(IFuenteRepository fuenteRepository, FinanciamientoService financiamientoService, ModelMapper modelMapper, IEquipamientoRepository equipamientoRepository, EquipamientoFactory equipamientoFactory) {
        super(fuenteRepository, financiamientoService, modelMapper);
        this.equipamientoRepository = equipamientoRepository;
        this.equipamientoFactory = equipamientoFactory;
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }

        Page<Equipamiento> equipamientoPage = equipamientoRepository.findByBorrado(false, PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = equipamientoPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, equipamientoPage.getPageable(), equipamientoPage.getTotalElements());
    }

    @Override
    public AdquisicionDTO getAdquisicionById(Long id) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findByIdAndBorrado(id, false);
        if(equipamientoOptional.isPresent()){
            return modelMapper.map(equipamientoOptional.get(), AdquisicionDTO.class);
        }
        throw new InvalidAdquisicionException("El equipamiento solicitado no existe");
    }


    @Override
    public Page<AdquisicionDTO> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);

        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }

        Page<Equipamiento> equipamientoPage = equipamientoRepository.findByFuenteFinanciamientoAndBorrado(fuenteFinanciamiento, false, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = equipamientoPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, equipamientoPage.getPageable(), equipamientoPage.getTotalElements());
    }


    @Override
    public AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Equipamiento e = equipamientoFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-e.getCosto());

        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }
        validarFechas(adquisicionDTO.getFechaIncorporacion());
        this.fuenteRepository.save(fuenteFinanciamiento);
        equipamientoRepository.save(e);

        return adquisicionDTO;
    }

    @Override
    public AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findByIdAndBorrado(id, false);

        if(equipamientoOptional.isPresent()){
            Equipamiento e = equipamientoOptional.get();
            FuenteFinanciamiento fuenteFinanciamiento = e.getFuenteFinanciamiento();

            fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()+e.getCosto()-adquisicionDTO.getCosto());
            if (fuenteFinanciamiento.getMonto() < 0){
                throw new InvalidAdquisicionException("Fondos insuficientes");
            }
            validarFechas(adquisicionDTO.getFechaIncorporacion());
            e.setDenominacion(adquisicionDTO.getDenominacion());
            e.setFechaIncorporacion(adquisicionDTO.getFechaIncorporacion());
            e.setCosto(adquisicionDTO.getCosto());
            e.setDescripcion(adquisicionDTO.getDescripcion());
            this.fuenteRepository.save(fuenteFinanciamiento);
            equipamientoRepository.save(e);
        } else {
            throw new InvalidAdquisicionException("El equipamiento que desea modificar no existe");
        }

        return adquisicionDTO;
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        Optional<Equipamiento> equipamientoOptional = equipamientoRepository.findByIdAndBorrado(id, false);

        if (equipamientoOptional.isEmpty()) {
            throw new InvalidAdquisicionException("La adquisicion no existe");
        }

        Equipamiento equipamiento = equipamientoOptional.get();
        FuenteFinanciamiento fuenteFinanciamiento = equipamiento.getFuenteFinanciamiento();
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + equipamiento.getCosto());
        equipamiento.setBorrado(true);
        equipamientoRepository.save(equipamiento);
        fuenteRepository.save(fuenteFinanciamiento);
    }

    public void validarFechas(LocalDate fechaIncorporacion){
        if (fechaIncorporacion.isAfter(LocalDate.now())){
            throw new InvalidAdquisicionException("La fecha de incorporacion no puede ser posterior a la fecha actual");
        }
    }
}
