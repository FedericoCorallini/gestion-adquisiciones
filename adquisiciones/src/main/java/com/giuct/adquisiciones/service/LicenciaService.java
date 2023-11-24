package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import com.giuct.adquisiciones.repository.ILicenciaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LicenciaService {
    private final ILicenciaRepository licenciaRepository;
    private final FinanciamientoService financiamientoService;

    public LicenciaService(ILicenciaRepository licenciaRepository, FinanciamientoService financiamientoService) {
        this.licenciaRepository = licenciaRepository;
        this.financiamientoService = financiamientoService;
    }

    public Page<Licencia> getLicencias(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return licenciaRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    public Licencia getLicenciaById(Long id) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findById(id);
        if(licenciaOptional.isPresent()){
            return licenciaOptional.get();
        }
        throw new InvalidAdquisicionException("La licencia solicitada no existe");
    }

    public Page<Licencia> getLicenciasByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return licenciaRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    public void agregarLicencia(Licencia licencia, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        licencia.setFuenteFinanciamiento(fuenteFinanciamiento);
        licenciaRepository.save(licencia);
    }

    public void modificarLicencia(Long id, Licencia licencia) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findById(id);
        if(licenciaOptional.isPresent()){
            Licencia l = licenciaOptional.get();
            l.setAnio(licencia.getAnio());
            l.setFabricante(licencia.getFabricante());
            l.setNombre(licencia.getNombre());
            l.setFechaOtorgamiento(licencia.getFechaOtorgamiento());
            l.setFechaVencimiento(licencia.getFechaVencimiento());
            l.setNumeroRelease(l.getNumeroRelease());
            l.setVersion(licencia.getVersion());
            l.setCosto(licencia.getCosto());
            l.setDescripcion(licencia.getDescripcion());
            licenciaRepository.save(l);
        }
        else{
            throw new InvalidAdquisicionException("La licencia que desea modificar no existe");
        }
    }

    public void eliminarLicencia(Long id) {
        this.licenciaRepository.deleteById(id);
    }
}
