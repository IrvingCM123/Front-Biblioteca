import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  showProfileOptions = false;

  @ViewChild('replayBtn', { static: true }) replayBtn: ElementRef | any;
  @ViewChild('.panel') panels: ElementRef[] | any;
  @ViewChild('.front') fronts: ElementRef[] | any;
  @ViewChild('.back') backs: ElementRef[] | any;
  mirrorTimeline: any;
  titleTimeline: any;

  constructor() { }

  ngOnInit(): void {
    gsap.set(this.replayBtn.nativeElement, { opacity: 0 });
    this.replayBtn.nativeElement.addEventListener("click", (e: any) => {
      this.mirrorTimeline.restart();
      this.titleTimeline.restart();
      gsap.to(e.target, 0.5, { opacity: 0 });
      console.log(e.target);
    });

    const mirrorTL = gsap.timeline();
    const titleTL = gsap.timeline();

    mirrorTL
      .to(this.fronts, { duration: 2.5, backgroundPosition: "30px 0px", ease: "expo.inOut" })
      .to(this.panels, { duration: 2.5, z: -300, rotationY: 180, ease: "expo.inOut" }, "-=2.3")
      .from(this.backs, {
        duration: 2.5,
        backgroundPosition: "-30px 0px",
        ease: "expo.inOut",
        onComplete: () => {
          gsap.to(this.replayBtn.nativeElement, { duration: 1, opacity: 1 });
        }
      }, "-=2.3");

    titleTL
      .to(".layer", { duration: 1, clipPath: "polygon(3% 0, 100% 0%, 100% 100%, 0% 100%)" })
      .to(".layer h1", { duration: 2, x: 400, ease: "expo.inOut" }, "-=0.5")
      .to(".cta", { duration: 2, x: 0, ease: "expo.inOut" }, "-=2");
  }
}

