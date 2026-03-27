package com.example.orderservice.config;

import org.springframework.boot.graphql.autoconfigure.GraphQlSourceBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.data.federation.FederationSchemaFactory;

@Configuration
public class FederationConfig {

    @Bean
    public GraphQlSourceBuilderCustomizer federationCustomizer(FederationSchemaFactory factory) {
        return builder -> builder.schemaFactory(factory::createGraphQLSchema);
    }

    @Bean
    public FederationSchemaFactory federationSchemaFactory() {
        return new FederationSchemaFactory();
    }
}