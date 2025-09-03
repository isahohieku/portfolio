import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ScrollTopModule } from 'primeng/scrolltop';

export interface ProjectImage {
  id: number;
  imageUrl: string;
  imageName: string;
  position: number;
}

export interface ProjectData {
  id: number;
  title: string;
  position: number;
  description?: string;
  portfolio_url?: string;
  images: ProjectImage[];
  links: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, GalleriaModule, TagModule, ScrollTopModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectedProject: ProjectData | null = null;
  displayDialog = false;
  
  projects: ProjectData[] = [
    {
      id: 9613,
      title: "Hobeei Freecycle application",
      position: 1,
      description: "A Greentech donation platform that enables people to recycle their unwanted and preowned items. Built with modern web technologies to promote sustainability and community sharing.",
      portfolio_url: "https://www.hobeei.com/",
      images: [
        {
          id: 7038,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/zI6gmnq6ZaW8JlkmKpJij2NizAU46h1fjxGM1Rcw.png",
          imageName: "2NizAU46h1fjxGM1Rcw.png",
          position: 1
        },
        {
          id: 7039,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/97F5Me5iaxRu8UeTAprVCfnwAZ1ZTtZpPFYZPoSo.png",
          imageName: "fnwAZ1ZTtZpPFYZPoSo.png",
          position: 2
        },
        {
          id: 7040,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/nHhVwjNXPfZRpYTuEC8R7jte71TvmWVEUV6j51Oj.png",
          imageName: "jte71TvmWVEUV6j51Oj.png",
          position: 3
        },
        {
          id: 7041,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/Qrk88C9nd6Foorh3xlBej9LrG8pI2xgSpQ8Njub6.png",
          imageName: "9LrG8pI2xgSpQ8Njub6.png",
          position: 4
        }
      ],
      links: []
    },
    {
      id: 9614,
      title: "Apply Schools and Applypay",
      position: 2,
      description: "Educational technology platform providing comprehensive solutions for schools and payment processing. Features include student management, fee collection, and administrative tools.",
      portfolio_url: "https://applypay.ng/",
      images: [
        {
          id: 7042,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/Z2uCVG0Po3kaEjiUAGjZpZL3QCoM34u4RGaHXYMN.png",
          imageName: "ZL3QCoM34u4RGaHXYMN.png",
          position: 1
        },
        {
          id: 7043,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/zvwubdyfKtc5NvmZTXBP2pE5wng0bD1538sXbc09.png",
          imageName: "pE5wng0bD1538sXbc09.png",
          position: 2
        },
        {
          id: 7044,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/SzGjRmmcteBf2zpewaCckc4xqsoOSB6lJpB02TO5.png",
          imageName: "c4xqsoOSB6lJpB02TO5.png",
          position: 3
        },
        {
          id: 7045,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/sK6UI9iD5rEqxXwexnpfQgea71pohTbjBA5kYQlZ.png",
          imageName: "gea71pohTbjBA5kYQlZ.png",
          position: 4
        },
        {
          id: 7052,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/Bx3hyfUfJC8h9mxYPxNPZSrXdEZtn5wDAwqW4goA.png",
          imageName: "SrXdEZtn5wDAwqW4goA.png",
          position: 5
        },
        {
          id: 7059,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/p8oIgcJxsSCEgPZ7Ikm3teKA5SRKEaayvXbJjmmf.png",
          imageName: "eKA5SRKEaayvXbJjmmf.png",
          position: 6
        }
      ],
      links: []
    },
    {
      id: 9616,
      title: "Talk360 Payment Platform",
      position: 3,
      description: "Comprehensive payment platform enabling international calling and mobile top-up services. Features secure payment processing, user management, and real-time transaction monitoring.",
      portfolio_url: "https://talk360.com/",
      images: [
        {
          id: 7047,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/9UwCSvDWtNZKaWNxEN6Mx1ztd36OpbQyRqWTHEak.png",
          imageName: "1ztd36OpbQyRqWTHEak.png",
          position: 1
        },
        {
          id: 7048,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/HrTb72eT3WVVlDyHkPqmP9yAdvvoJhAElYNsgcwz.png",
          imageName: "9yAdvvoJhAElYNsgcwz.png",
          position: 2
        },
        {
          id: 7049,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/xEpaEXwdt3lBjfOya2aT4O4TDIAh8eR819SmkvCf.png",
          imageName: "O4TDIAh8eR819SmkvCf.png",
          position: 3
        },
        {
          id: 7050,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/lxRRaAyEWn4baVc3qlIBEd3jw66AZsq7jwZvvvNR.png",
          imageName: "d3jw66AZsq7jwZvvvNR.png",
          position: 4
        },
        {
          id: 7051,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/XlPrxri6wAlYVD138jUmdKqhCWrmUMXQuvABpdId.png",
          imageName: "KqhCWrmUMXQuvABpdId.png",
          position: 5
        }
      ],
      links: []
    },
    {
      id: 9617,
      title: "Talk360 Calling app",
      position: 4,
      description: "Mobile calling application providing affordable international calls with crystal clear voice quality. Features include contact management, call history, and credit top-up functionality.",
      portfolio_url: "https://talk360.com/",
      images: [
        {
          id: 7053,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/0kMrpkvfsMqZfH1tbXObtYrq7RtR9NBwNjRI9vtf.png",
          imageName: "Yrq7RtR9NBwNjRI9vtf.png",
          position: 1
        },
        {
          id: 7054,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/JosY3kb43bPzkqKs9lr576W4DkoyfwoO2yCB9HkL.png",
          imageName: "6W4DkoyfwoO2yCB9HkL.png",
          position: 2
        },
        {
          id: 7055,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/ZyWEOeAP8ckBUkqx1o39A2mCbrGWkHoN1nbYyuF6.png",
          imageName: "2mCbrGWkHoN1nbYyuF6.png",
          position: 3
        },
        {
          id: 7056,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/3T5b4slAUt47B2PUyJ2SboYyeKPtsFYUQoqgUkpP.png",
          imageName: "oYyeKPtsFYUQoqgUkpP.png",
          position: 4
        },
        {
          id: 7057,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/6NhQK8B20h61TJIINLlOYTSJIKrP1onPdeWKOfXo.png",
          imageName: "TSJIKrP1onPdeWKOfXo.png",
          position: 5
        },
        {
          id: 7058,
          imageUrl: "https://app-images.cdn.proxify.io/developers/portfolio/jNvQlRuXtGenu1dGwytzByazesRzyOaougl4ZGAL.png",
          imageName: "yazesRzyOaougl4ZGAL.png",
          position: 6
        }
      ],
      links: []
    }
  ];

  ngOnInit() {
    // Sort projects by position
    this.projects.sort((a, b) => a.position - b.position);
  }

  openProjectDialog(project: ProjectData) {
    this.selectedProject = project;
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedProject = null;
  }

  visitProject(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getProjectThumbnail(project: ProjectData): string {
    return project.images.length > 0 ? project.images[0].imageUrl : '';
  }

  getGalleryImages(project: ProjectData) {
    return project.images.map(img => ({
      previewImageSrc: img.imageUrl,
      thumbnailImageSrc: img.imageUrl,
      alt: img.imageName,
      title: `${project.title} - Image ${img.position}`
    }));
  }
}
