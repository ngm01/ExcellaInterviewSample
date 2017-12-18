/*
Run with "ng test --sourcemaps=false"
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FormsModule} from '@angular/forms';
import { QuestionService } from '../../question.service';
// import { HttpModule } from '@angular/http';
// import { UserService } from '../../user.service';
import {Observable} from 'rxjs/Rx';

import { DashboardComponent } from '../dashboard.component';
import { SearchResultsComponent } from './search-results.component';


const mockQuestions = {"questions":[
  {"_id":"59f62de9c34ff61dc0bc2ac2","updatedAt":"2017-10-29T21:29:43.196Z","createdAt":"2017-10-29T19:37:13.102Z","qtext":"This is a question","user":"Bob"},
  {"_id":"59f62f88ac1d6c22f404c746","updatedAt":"2017-10-29T21:14:01.419Z","createdAt":"2017-10-29T19:44:08.825Z","qtext":"Frank has a question","user":"Frank"},
  {"_id":"59f64b89eb168f1df44a5d27","updatedAt":"2017-12-14T01:10:16.451Z","createdAt":"2017-10-29T21:43:37.183Z","qtext":"Who's a good boy?","user":"Sam"},
  {"_id":"59f8e1f490d1102408969b5f","updatedAt":"2017-12-13T19:53:31.231Z","createdAt":"2017-10-31T20:49:56.025Z","qtext":"I'm Batman?","user":"Batman"},
  {"_id":"5a31845758c1aa12a081ad49","updatedAt":"2017-12-15T00:38:46.997Z","createdAt":"2017-12-13T19:49:43.045Z","qtext":"How does Angular work?","user":"Darth"},
  {"_id":"5a3319a5741d5203009531e6","updatedAt":"2017-12-15T00:39:01.299Z","createdAt":"2017-12-15T00:39:01.299Z","qtext":"Delete this","user":"Bob"}
  ]}


describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let router;

  const MockQuestionService = jasmine.createSpyObj('QuestionService', ['ShowAllQuestions','DeleteQuestion']);
  MockQuestionService.ShowAllQuestions.and.returnValue(Observable.of(mockQuestions));
  MockQuestionService.DeleteQuestion.and.callFake((id)=>{
    return id;
  })

  const MockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  MockRouter.navigateByUrl.and.callFake((url)=>{
    return url;
  })

  beforeEach( async() => {
    component = new SearchResultsComponent(MockQuestionService, MockRouter);
    component.ngOnInit();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call the ShowAllQuestions method of the mock question service', () => {
    component.showAll();
    expect(MockQuestionService.ShowAllQuestions).toHaveBeenCalled();
  }); 

  it("should return all questions when query is empty string", ()=>{
    component.getSearchResults("");
    expect(component.questionsList.length).toEqual(6);
  })

  it("should return two questions from the user 'Bob'", ()=>{
    component.getSearchResults("Bob");
    expect(component.questionsList.length).toEqual(2);
  })

  it("should return two questions contaning the string 'question'", ()=>{
    component.getSearchResults("question");
    expect(component.questionsList.length).toEqual(2);
  })

  it("should return no questions containing the answer 'answer'", ()=>{
    component.getSearchResults("answer");
    expect(component.questionsList.length).toEqual(0);
  })

  it("should call the DeleteQuestion method of the mock question service", ()=>{
    component.Delete("59f62de9c34ff61dc0bc2ac2");
    expect(MockQuestionService.DeleteQuestion).toHaveBeenCalled();
  })

  it("should call the navigateByUrl method of the 'router'", ()=>{
    component.Delete("59f62de9c34ff61dc0bc2ac2");
    expect(MockRouter.navigateByUrl).toHaveBeenCalled();
  })

  it("should sort the mockQuestions users alphabetically, placing Batman first", ()=>{
    component.SortQuestions("user");
    expect(component.questionsList.findIndex(q => q.user=="Batman")).toBe(0);
  })

  it("should sort the mockQuestions users in reverse alphabetical order, placing Sam first", ()=>{
    component.SortQuestions("user", "descending");
    expect(component.questionsList.findIndex(q => q.user=="Sam")).toBe(0);
  })

});
