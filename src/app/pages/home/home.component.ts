import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { SiteHeaderComponent } from '../../layout/site-header/site-header.component';
import { SiteFooterComponent } from '../../layout/site-footer/site-footer.component';
import { AboutSectionComponent } from '../../sections/about-section/about-section.component';
import { ContactSectionComponent } from '../../sections/contact-section/contact-section.component';
import { DifferentialsSectionComponent } from '../../sections/differentials-section/differentials-section.component';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';
import { ServicesSectionComponent } from '../../sections/services-section/services-section.component';
import { WhatsappFloatComponent } from '../../shared/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SiteHeaderComponent,
    SiteFooterComponent,
    WhatsappFloatComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    DifferentialsSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('reveal--visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    elements.forEach((element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
