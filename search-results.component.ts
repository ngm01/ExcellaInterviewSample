import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../../question.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() query;
  @Input() current_user;
  questionsList = [];
  constructor(private _questionservice: QuestionService, private _router: Router) { }

  ngOnInit() {
    this.showAll();
    console.log(this.questionsList);
    this.questionsList = this.questionsList;
  }

  showAll(){
    this._questionservice.ShowAllQuestions().subscribe(
      res =>{ this.questionsList = res.questions; } 
    )
  }

  getSearchResults(query){
    //Searches survey questions by question text and question-asker's user name
    const searchResults = this.questionsList.filter(q => q.qtext.toLowerCase().includes(query.toLowerCase()) || q.user.toLowerCase().includes(query.toLowerCase()) )
    this.questionsList=searchResults;
  }

  SortQuestions(property, direction="ascending"){
    let directionSwitch = 1;
    if(direction == "descending"){
        directionSwitch = -1;
    }

    console.log(this.questionsList);
    this.questionsList.sort(compare);
    console.log(this.questionsList);

    function compare(a, b){
        if(a[property] < b[property]){
            return -1 * directionSwitch;
        }
        if(a[property] > b[property]){
            return 1 * directionSwitch;
        }
        return 0;
    }
}

  Delete(id){
    this._questionservice.DeleteQuestion(id);
    this._router.navigateByUrl('/')
  }

}
