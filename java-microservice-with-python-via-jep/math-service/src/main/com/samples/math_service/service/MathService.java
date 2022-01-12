package com.samples.math_service.service;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.samples.math_service.model.AdditionRequest;
import com.samples.math_service.model.AdditionResponse;

import jep.JepException;
import jep.SharedInterpreter;
import lombok.extern.slf4j.Slf4j;

/**
 * The Class MathService.
 */
@Service
@Slf4j
public class MathService {
	
	/** 
	 * Intialize. - Warming up JEP
	 */
	@PostConstruct
	public void intialize() {
		try {
			this.performAddition(AdditionRequest.builder().a(10).b(20).build());
		} catch (JepException e) {
			log.error("Exception in evaluating", e);
		}
	}

	/**
	 * Perform addition.
	 *
	 * @param additionRequest the addition request
	 * @return the addition response
	 * @throws JepException the jep exception
	 */
	public AdditionResponse performAddition(AdditionRequest additionRequest) throws JepException {
		try (SharedInterpreter interpreter = new SharedInterpreter()) {
			interpreter.set("a", additionRequest.getA());
			interpreter.set("b", additionRequest.getB());
			interpreter.eval("c = a + b");
			Long result = interpreter.getValue("c", Long.class);
			return AdditionResponse.builder().c(result).build();
		}
	}
}
