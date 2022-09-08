package com.stackroute.userservice.logger;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
public class LoggerAspect {

    private static final Logger logger= LoggerFactory.getLogger(LoggerAspect.class);

//    @Pointcut("execution(* com.stackroute.userservice.controller.UserController.*(..))")

    @Pointcut("execution(* com.stackroute.userservice.*.*.* (..) )")
    public void serviceMethods(){
    }

//    @Before("controllerMethods()")
//    public void beforeAdvice(JoinPoint joinPoint){
//        logger.info("**************************@Before***************************");
//        logger.debug("method Name: {}",joinPoint.getSignature().getName());
//        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
//        logger.info("*************************************************************");
//    }
//
//    @After("controllerMethods()")
//    public void afterAdvice(JoinPoint joinPoint){
//        logger.info("**************************@After***************************");
//        logger.debug("method Name: {}",joinPoint.getSignature().getName());
//        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
//        logger.info("*************************************************************");
//    }
//
//    @AfterReturning(value = "controllerMethods()",returning = "result")
//    public void afterAdvice(JoinPoint joinPoint,Object result){
//
//        logger.info("*************************@AfterReturning**************************");
//        logger.debug("method Name: {}",joinPoint.getSignature().getName());
//        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
//        logger.debug("Return Value: {}",result);
//        logger.info("*************************************************************");
//    }
//
//    @AfterThrowing(value = "controllerMethods()",throwing = "error")
//    public void afterAdvice(JoinPoint joinPoint,Throwable error){
//        logger.info("*************************@AfterThrowing**************************");
//        logger.debug("method Name: {}",joinPoint.getSignature().getName());
//        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
//        logger.debug("Exception: {}",error);
//        logger.info("*************************************************************");
//    }
//
//    @Pointcut("execution(* com.stackroute.userservice.service.UserService.*(..))")
//    public  void serviceMethods(){
//    }

    @Before("serviceMethods()")
    public void beforeServiceAdvice(JoinPoint joinPoint){
        logger.info("**************************@Before***************************");
        logger.debug("method Name: {}",joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.info("*************************************************************");
    }

    @After("serviceMethods()")
    public void afterServiceAdvice(JoinPoint joinPoint){
        logger.info("**************************@After***************************");
        logger.debug("method Name: {}",joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.info("*************************************************************");
    }

    @AfterReturning(value = "serviceMethods()",returning = "result")
    public void afterServiceAdvice(JoinPoint joinPoint,Object result){

        logger.info("*************************@AfterReturning**************************");
        logger.debug("method Name: {}",joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.debug("Return Value: {}",result);
        logger.info("*************************************************************");
    }

    @AfterThrowing(value = "serviceMethods()",throwing = "error")
    public void afterServiceAdvice(JoinPoint joinPoint,Throwable error){
        logger.info("*************************@AfterThrowing**************************");
        logger.debug("method Name: {}",joinPoint.getSignature().getName());
        logger.debug("Method Args: {}", Arrays.toString(joinPoint.getArgs()));
        logger.debug("Exception: {}",error);
        logger.info("*************************************************************");
    }

}
