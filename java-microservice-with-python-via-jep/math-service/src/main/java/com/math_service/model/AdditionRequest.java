package com.samples.math_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Instantiates a new addition request.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdditionRequest {

	/** The a. */
	private int a;
	
	/** The b. */
	private int b;
}
