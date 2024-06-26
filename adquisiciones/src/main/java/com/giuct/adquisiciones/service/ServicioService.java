package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.ServiceFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Servicio;
import com.giuct.adquisiciones.repository.IFuenteRepository;
import com.giuct.adquisiciones.repository.IServicioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("servicios")
public class ServicioService extends AdquisicionService{

    private final IServicioRepository servicioRepository;
    private final ServiceFactory serviceFactory;

    public ServicioService(IFuenteRepository fuenteRepository, FinanciamientoService financiamientoService, ModelMapper modelMapper, IServicioRepository servicioRepository, ServiceFactory serviceFactory) {
        super(fuenteRepository, financiamientoService, modelMapper);
        this.servicioRepository = servicioRepository;
        this.serviceFactory = serviceFactory;
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Servicio> servicioPage = servicioRepository.findByFuenteFinanciamientoAndBorrado(fuenteFinanciamiento, false, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = servicioPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, servicioPage.getPageable(), servicioPage.getTotalElements());
    }

    @Override
    public AdquisicionDTO getAdquisicionById(Long id) {
        Optional<Servicio> servicioOptional = servicioRepository.findByIdAndBorrado(id, false);;
        if(servicioOptional.isPresent()){
            return modelMapper.map(servicioOptional.get(), AdquisicionDTO.class);
        }
        throw new InvalidAdquisicionException("El servicio solicitado no existe");
    }

    @Override
    public Page<AdquisicionDTO> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        Page<Servicio> servicioPage = servicioRepository.findByBorrado(false, PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));

        List<AdquisicionDTO> adquisicionDTOs = servicioPage.getContent()
                .stream()
                .map(a -> modelMapper.map(a, AdquisicionDTO.class))
                .toList();

        return new PageImpl<>(adquisicionDTOs, servicioPage.getPageable(), servicioPage.getTotalElements());
    }

    @Override
    public AdquisicionDTO agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Servicio s = serviceFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()-s.getCosto());
        if (fuenteFinanciamiento.getMonto() < 0){
            throw new InvalidAdquisicionException("Fondos insuficientes");
        }
        this.fuenteRepository.save(fuenteFinanciamiento);
        this.servicioRepository.save(s);

        return adquisicionDTO;
    }

    @Override
    public AdquisicionDTO modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Servicio> servicioOptional = servicioRepository.findByIdAndBorrado(id, false);
        if(servicioOptional.isPresent()){
            Servicio s = servicioOptional.get();
            FuenteFinanciamiento fuenteFinanciamiento = s.getFuenteFinanciamiento();

            fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto()+s.getCosto()-adquisicionDTO.getCosto());
            if (fuenteFinanciamiento.getMonto() < 0){
                throw new InvalidAdquisicionException("Fondos insuficientes");
            }

            s.setTipo(adquisicionDTO.getTipo());
            s.setCosto(adquisicionDTO.getCosto());
            s.setDescripcion(adquisicionDTO.getDescripcion());
            this.fuenteRepository.save(fuenteFinanciamiento);
            this.servicioRepository.save(s);
        }
        else{
            throw new InvalidAdquisicionException("La bibliografia que desea modificar no existe");
        }

        return adquisicionDTO;
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        Optional<Servicio> servicioOptional = servicioRepository.findByIdAndBorrado(id, false);;

        if (servicioOptional.isEmpty()) {
            throw new InvalidAdquisicionException("La adquisicion no existe");
        }

        Servicio servicio = servicioOptional.get();
        FuenteFinanciamiento fuenteFinanciamiento = servicio.getFuenteFinanciamiento();
        fuenteFinanciamiento.setMonto(fuenteFinanciamiento.getMonto() + servicio.getCosto());
        servicio.setBorrado(true);
        servicioRepository.save(servicio);
        fuenteRepository.save(fuenteFinanciamiento);
    }
}
