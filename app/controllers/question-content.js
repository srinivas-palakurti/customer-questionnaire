import Controller from '@ember/controller';
import { action } from "@ember/object";
// import EmberObject, { computed } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { A } from '@ember/array';

export default class QuestionContentController extends Controller {

  @tracked nextCounter = 0;
  @tracked counterValue = 1;

  isChecked = false;
  identifierSelected = "";
  identifierSelectedValue = "";

  nextQuestionsMap = A();

  isJumped = false;
  presentedIdentifier = "";

  isSelectedSkipQuestion = true;
  skipArray = A();

  @tracked nextButtonTitle = "Next";

  @action
  previousQuestion() {

    this.counterValue--;
    this.skipArray.forEach(skipValue => {

      if (skipValue === this.nextCounter-1) {
        this.nextCounter--;
      }
    });

    //adding jump identifier to an array
    if (this.nextQuestionsMap.length > 0) {
      var sourceIdentifier = "";
      for (let index = 0; index < this.nextQuestionsMap.length; index++) {
        const question = this.nextQuestionsMap[index];

      // this.nextQuestionsMap.forEach(question => {
        if (question[0].destinationidentifier === this.presentedIdentifier) {
          sourceIdentifier = question[0].sourceidentifier;

          let queIndex = this.model.questionnaire.questions.findIndex(question => question.identifier === sourceIdentifier);
          if (queIndex != -1) {

            this.nextCounter = queIndex;

            this.presentedIdentifier = sourceIdentifier
            console.log("from previous --> presentedIdentifier " +this.presentedIdentifier);

            //resetting seleted values for current qustion
            this.identifierSelected = "";
            this.identifierSelectedValue = "";

            return;
          }
        }
      }

      if (sourceIdentifier === "") {
        this.nextCounter--;
        this.presentedIdentifier = this.model.questionnaire.questions.objectAt(this.nextCounter).identifier;
        console.log("from previous --> presentedIdentifier " +this.presentedIdentifier);

        //resetting seleted values for current qustion
        this.identifierSelected = "";
        this.identifierSelectedValue = "";
      }

    } else {
      this.nextCounter--;
      this.presentedIdentifier = this.model.questionnaire.questions.objectAt(this.nextCounter).identifier;
      console.log("from previous --> presentedIdentifier " +this.presentedIdentifier);

      //resetting seleted values for current qustion
      this.identifierSelected = "";
      this.identifierSelectedValue = "";
    }

    if (this.model.questionnaire.questions.length === this.nextCounter-1) {
      this.nextButtonTitle = "Finish";
    } else {
      this.nextButtonTitle = "Next";
    }
  }

  @action
  nextQuestion() {

    if (this.nextButtonTitle === "Finish") {
      this.gotoFinishScreen();
    } else {

    this.counterValue++;
    this.skipArray.forEach(skipValue => {

      if (skipValue === this.nextCounter+1) {
        this.nextCounter++;
      }
    });

    if (this.identifierSelected) {

      var question;
      let queIndex = this.model.questionnaire.questions.findIndex(question => question.identifier === this.identifierSelected);
      if (queIndex != -1) {
        question = this.model.questionnaire.questions[queIndex];
      }

      if (question.jumps.length > 0) {
        let jumpsArray = question.jumps;

          for (let index = 0; index < jumpsArray.length; index++) {
            const conditionsObj = jumpsArray[index];
            let conditionsArray = conditionsObj.conditions;
            var destinationValue;

            //checking jump array for conditions to present next question
            conditionsArray.forEach(element => {
            if (element.value === this.identifierSelectedValue && element.field === this.identifierSelected) {
              let destination = conditionsObj.destination;
              let queIndexDestination = this.model.questionnaire.questions.findIndex(question => question.identifier === destination.id);

              if (queIndexDestination != -1) {
                this.isJumped = true;
                // this.nextCounter++;
                console.log("jumped to " +this.identifierSelected);
              } else {
                // not able to find destination question
                console.log("not able to find destination question");
                this.nextCounter++;
              }

              for (let indexValue = index+1; indexValue < jumpsArray.length; indexValue++) {
                const conditionsObjSkip = jumpsArray[indexValue];
                let destinationSkip = conditionsObjSkip.destination;

                let skipQue = this.model.questionnaire.questions.findIndex(question => question.identifier === destinationSkip.id);

                if (skipQue != -1) {
                  for (let indexSkip = this.nextCounter; indexSkip < skipQue; indexSkip++) {
                    // const element = array[indexSkip];
                    this.skipArray.addObject(skipQue);
                  }
                }
              }

              var sourceValue = element.field;
              destinationValue = destination.id;

              //adding jump identifier to an array
              if (this.nextQuestionsMap.length > 0) {
                let queIndex = this.nextQuestionsMap.findIndex(question => question[0].sourceidentifier === this.identifierSelected);
                if (queIndex != -1) {
                  let queIndexModel = this.model.questionnaire.questions.findIndex(question => question.identifier === destinationValue);

                  if (queIndexModel != -1) {

                    for (let index = this.nextCounter; index < queIndexModel; index++) {
                      let indexObj = index + 1;
                      this.skipArray.addObject(indexObj);
                    }
                    this.nextCounter = queIndexModel;
                  }

                  this.isSelectedSkipQuestion = true;
                  this.nextQuestionsMap.objectAt(queIndex)[0].destinationidentifier = destinationValue;
                } else {
                  this.nextCounter = queIndexDestination;
                  this.isSelectedSkipQuestion = true;
                  this.nextQuestionsMap.addObject([{
                    "sourceidentifier": sourceValue,
                    "destinationidentifier": destinationValue
                  }]); // add other condition destination to skip array
                  // this.nextQuestionsMap.addObject([{"sourceidentifier":sourceValue, "destinationidentifier":destinationValue}]);
                }
              } else {
                this.nextCounter = queIndexDestination;
                this.isSelectedSkipQuestion = true;
                this.nextQuestionsMap.addObject([{"sourceidentifier":sourceValue, "destinationidentifier":destinationValue}]);
                // add other condition destination to skip array
              }

              this.presentedIdentifier = destinationValue;
              console.log("jumped to presentedIdentifier " +this.presentedIdentifier);

              //resetting seleted values for current qustion
              this.identifierSelected = "";
              this.identifierSelectedValue = "";
              return;
            } else {
              // adding value to skip array

              let questionIndex = this.model.questionnaire.questions.findIndex(question => question.identifier === conditionsObj.destination.id);
              this.skipArray.addObject(questionIndex);
              // this.isSelectedSkipQuestion = true;
            }
          });
        }
        this.isSelectedSkipQuestion = false;
      } else {

        this.nextCounter++;
        this.isJumped = false;
        this.presentedIdentifier = this.model.questionnaire.questions.objectAt(this.nextCounter).identifier;
        console.log("presentedIdentifier " +this.presentedIdentifier);

        //resetting seleted values for current qustion
        this.identifierSelected = "";
        this.identifierSelectedValue = "";
        return;
      }
    } else {
      //adding jump identifier to an array
      this.nextButtonClickWithoutclickingOnOption();
    }

    if (this.model.questionnaire.questions.length === this.nextCounter) {
      this.nextButtonTitle = "Finish";
    } else {
      this.nextButtonTitle = "Next";
    }
  }
  }

  gotoFinishScreen() {
    this.counterValue = 1;
    this.nextCounter = 0;

    this.isChecked = false;
    this.identifierSelected = "";
    this.identifierSelectedValue = "";

    this.nextQuestionsMap.clear();

    this.isJumped = false;
    this.presentedIdentifier = "";

    this.isSelectedSkipQuestion = true;
    this.skipArray.clear();

    this.nextButtonTitle = "Next";
    this.transitionToRoute('index');
  }

  nextButtonClickWithoutclickingOnOption() {
    //adding jump identifier to an array
    if (this.nextQuestionsMap.length > 0) {
      let queIndex = this.nextQuestionsMap.findIndex(question => question[0].sourceidentifier === this.presentedIdentifier);
      if (queIndex != -1) {
        let queIndexModel = this.model.questionnaire.questions.findIndex(question => question.identifier === this.nextQuestionsMap[queIndex][0].destinationidentifier);

        if (queIndexModel != -1) {
          this.nextCounter = queIndexModel;
        }
      } else {
      }

      this.presentedIdentifier = this.model.questionnaire.questions[this.nextCounter].identifier;
      console.log("jumped to presentedIdentifier " +this.presentedIdentifier);
    } else {
      //if not selected any option and clicked on Next button
      // this.nextCounter++;
      this.presentedIdentifier = this.model.questionnaire.questions.objectAt(this.nextCounter).identifier;
      console.log("presentedIdentifier " +this.presentedIdentifier);
    }
    this.nextCounter++;

  }

  @action
  radioButtonSelected(identifier, value) {
    this.identifierSelected = identifier;
    this.identifierSelectedValue = value;

    console.log(identifier +" "+ value);
  }

  @action
  checkboxButtonSelected(identifier, value) {
    console.log(identifier +" "+ value);
  }


}
