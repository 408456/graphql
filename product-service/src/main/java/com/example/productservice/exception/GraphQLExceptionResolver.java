package com.example.productservice.exception;

import com.example.productservice.exception.business.ConflictException;
import com.example.productservice.exception.business.ResourceNotFoundException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import jakarta.validation.ConstraintViolationException;
import org.apache.coyote.BadRequestException;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;

@Component
public class GraphQLExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        if (ex instanceof ResourceNotFoundException) {
            return GraphqlErrorBuilder.newError()
                    .message(ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .errorType(graphql.ErrorType.InvalidSyntax)
                    .build();
        } else if (ex instanceof ConflictException) {
            return GraphqlErrorBuilder.newError()
                    .message(ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        } else if (ex instanceof BadRequestException) {
            return GraphqlErrorBuilder.newError()
                    .message(ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        } else if (ex instanceof ConstraintViolationException) {
            return GraphqlErrorBuilder.newError()
                    .message("Validation error: " + ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        } else if (ex instanceof BindException) {
            return GraphqlErrorBuilder.newError()
                    .message("Validation error: " + ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        }
        return super.resolveToSingleError(ex, env);
    }
}
