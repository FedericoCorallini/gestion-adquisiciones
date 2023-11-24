package com.giuct.adquisiciones.handler;

import com.giuct.adquisiciones.exceptions.InvalidAdquisicionException;
import com.giuct.adquisiciones.exceptions.InvalidFuenteFinanciamientoException;
import com.giuct.adquisiciones.model.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidAdquisicionException.class)
    public ResponseEntity<MessageDTO> invalidAdquisicionException(InvalidAdquisicionException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageDTO(e.getMessage()));
    }
    @ExceptionHandler(InvalidFuenteFinanciamientoException.class)
    public ResponseEntity<MessageDTO> invalidFuenteFinanciamientoException(InvalidAdquisicionException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageDTO(e.getMessage()));
    }
}
