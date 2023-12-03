package com.giuct.adquisiciones.service;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.factory.LicenciaFactory;
import com.giuct.adquisiciones.model.dto.AdquisicionDTO;
import com.giuct.adquisiciones.model.entity.Adquisicion;
import com.giuct.adquisiciones.model.entity.Bibliografia;
import com.giuct.adquisiciones.model.entity.FuenteFinanciamiento;
import com.giuct.adquisiciones.model.entity.Licencia;
import com.giuct.adquisiciones.repository.ILicenciaRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("licencias")
@AllArgsConstructor
public class LicenciaService extends AdquisicionService{

    private final ILicenciaRepository licenciaRepository;
    private final FinanciamientoService financiamientoService;
    private final LicenciaFactory licenciaFactory;


    @Override
    public Adquisicion getAdquisicionById(Long id) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findById(id);
        if(licenciaOptional.isPresent()){
            return licenciaOptional.get();
        }
        throw new InvalidAdquisicionException("La licencia solicitada no existe");
    }

    @Override
    public Page<? extends Adquisicion> getAdquisicion(Integer nroPagina, Integer nroElementos, String criterio) {
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return licenciaRepository.findAll(PageRequest.of(nroPagina,nroElementos, Sort.by(criterio)));
    }

    @Override
    public Page<? extends Adquisicion> getAdquisicionesByFinanciamiento(Long idFinanciamiento, String criterio, Integer nroPagina, Integer nroElementos) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        if(nroElementos==0){
            nroElementos = Integer.MAX_VALUE;
        }
        return licenciaRepository.findByFuenteFinanciamiento(fuenteFinanciamiento, PageRequest.of(nroPagina, nroElementos, Sort.by(criterio)));
    }

    @Override
    public void agregarAdquisicion(AdquisicionDTO adquisicionDTO, Long idFinanciamiento) {
        FuenteFinanciamiento fuenteFinanciamiento = financiamientoService.getFuenteById(idFinanciamiento);
        Licencia l = licenciaFactory.crear(adquisicionDTO, fuenteFinanciamiento);
        licenciaRepository.save(l);
    }

    @Override
    public void modificarAdquisicion(Long id, AdquisicionDTO adquisicionDTO) {
        Optional<Licencia> licenciaOptional = licenciaRepository.findById(id);
        if(licenciaOptional.isPresent()){
            Licencia l = licenciaOptional.get();
            l.setAnio(adquisicionDTO.getAnio());
            l.setFabricante(adquisicionDTO.getFabricante());
            l.setNombre(adquisicionDTO.getNombre());
            l.setFechaOtorgamiento(adquisicionDTO.getFechaOtorgamiento());
            l.setFechaVencimiento(adquisicionDTO.getFechaVencimiento());
            l.setNumeroRelease(adquisicionDTO.getNumeroRelease());
            l.setVersion(adquisicionDTO.getVersion());
            l.setCosto(adquisicionDTO.getCosto());
            l.setDescripcion(adquisicionDTO.getDescripcion());
            licenciaRepository.save(l);
        }
        else{
            throw new InvalidAdquisicionException("La licencia que desea modificar no existe");
        }
    }

    @Override
    public void eliminarAdquisicion(Long id) {
        this.licenciaRepository.deleteById(id);
    }
}
