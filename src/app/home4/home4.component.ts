import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import saveAs from 'file-saver';


import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { LeafletViewerComponent } from '../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletViewer2Component } from '../_components/leaflet-viewer2/leaflet-viewer2.component';

import { BritischeMonarchenImages, DonaldTrumpImages, FeatureData, HarryPotterImages, SigmundFreudImages } from '../_service/common-data.service';
import { LeafletImage } from '../_interface/leaflet-image';

@Component({
  selector: 'app-home4',
  imports: [RouterLink, LeafletViewerComponent, LeafletViewer2Component],
  templateUrl: './home4.component.html',
  styleUrl: './home4.component.scss'
})
export class Home4Component implements OnInit {

  pageTitle = 'Genogramm Designer - Funktionen';
  pageUrl = '/funktionen';

  images: FeatureData[] = []
  images1: FeatureData[] = []
  images2: FeatureData[] = []

  onDownload(image: LeafletImage) {
    console.log('Download clicked for image:', image);
    // Download-Logik
  }

  ngOnInit() {
    this.images = HarryPotterImages;
    this.images1 = HarryPotterImages;
    // this.images2 = BritischeMonarchenImages;
    // Initialisierungslogik  
  }

}
