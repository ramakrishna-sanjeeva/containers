package com.samples.math_service.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.samples.math_service.model.AdditionRequest;
import com.samples.math_service.model.AdditionResponse;
import com.samples.math_service.service.MathService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jep.JepException;
import lombok.extern.slf4j.Slf4j;

/** The Constant log. */
@Slf4j
@Api(value = "Math API", tags = "Math")
@RestController
@RequestMapping
public class MathAPI {
	
	/** The math service. */
	@Autowired
	private MathService mathService;

	/**
	 * Perform addition.
	 *
	 * @param additionRequest the addition request
	 * @return the response entity
	 */
	@PostMapping(value = "performAddition", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value = "Performs Addition", notes = "Performs Addition")
	public ResponseEntity<AdditionResponse> performAddition(@RequestBody AdditionRequest additionRequest) {
		log.debug("In performAddition API");
		try {
			AdditionResponse additionResponse = this.mathService.performAddition(additionRequest);
			return ResponseEntity.ok().body(additionResponse);
		} catch (JepException e) {
			log.error("Exception in evaluating", e);
			return ResponseEntity.internalServerError().header("Error", e.getMessage()).build();
		}
	}
}
