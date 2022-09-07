package com.stackroute.authentication.service.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* com.stackroute.authentication.service.*.*.* (..) )")
    public void repositoryMethods() {

    }

    @Before("repositoryMethods()")
    public void beforeAdvice(JoinPoint joinPoint) {
        logger.info("~~~~~~~~~~~~~Before Logging~~~~~~~~~~~~~");
        logger.debug("Method Name: {}", joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

    @After("repositoryMethods()")
    public void afterAdvice(JoinPoint joinPoint) {
        logger.info("~~~~~~~~~~~~~After~~~~~~~~~~~~~");
        logger.debug("Method Name: {}", joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

    @AfterReturning(value = "repositoryMethods()", returning = "result")
    public void afterAdvice(JoinPoint joinPoint, Object result) {
        logger.info("~~~~~~~~~~~~~AfterReturning~~~~~~~~~~~~~");
        logger.debug("Method Name: {}", joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.debug("Return Value: {}", result);
        logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

    @AfterThrowing(value = "repositoryMethods()", throwing = "error")
    public void afterAdvice(JoinPoint joinPoint, Throwable error) {
        logger.info("~~~~~~~~~~~~~AfterThrowing~~~~~~~~~~~~~");
        logger.debug("Method Name: {}", joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.debug("Exception: {}", error);
        logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }
}
