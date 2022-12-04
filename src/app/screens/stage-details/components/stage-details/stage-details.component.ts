import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { StageDetailsService } from '../../services/stage-details.service';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent implements OnInit {
  loading=true
  stages:any
  banner=''
  id=''
  constructor(private activatedRoute:ActivatedRoute,
    private stageService:StageDetailsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params:any) => {
        this.id=params?.id
         return this.stageService.getHomeStages(params?.id)
      })
    ).subscribe(
      (res:any)=> {
        if(res?.data?.length) {
          this.stages=res?.data[0]?.classes
          this.banner=res?.data[0].media
        }
        this.loading=false
      }
    )
  }
  hasSpecialist(item:any) {
    if(!!item?.has_specialties?.length) {
      return `/specialist/${this.id}/${item?.id}`
    } else {
      return `/classes/${item?.id}/-1`
    }
  }
}
