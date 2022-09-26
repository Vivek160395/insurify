package com.stackroute.purchaseinsuranceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LifeInsurance {

    private String maritalStatus;
    private String occupation;
    private String organisationType;
    private String Pan;
    private String aadhar;
    private long annualIncome;
    private int weight;
    private int height;
    private boolean[] questionnaireAnswers;

    private String[] questionnaire={"Have you consumed Alcohol in the last one year?",
                                    "Have you ever consumed narcotics?",
                                    "Are you employed in the armed, para military or police forces?",
                                    "Is your occupation associated with any specific hazard or do you take part in activities or have hobbies that could be dangerous in any way?",
                                    "Have you undergone any tests/investigations/surgery or have been hospitalized for observation or treatment in the past?"
                                   };
    private boolean lifeIllnessStatus;
    private String[] healthConditionList;
}
