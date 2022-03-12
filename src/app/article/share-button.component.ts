import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent implements OnInit, AfterViewInit {
  @Input() title: string | undefined = '';
  @Input() url: string | undefined = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.appendChild(this.getButtonScript('twitter'));
      this.elementRef.nativeElement.appendChild(this.getButtonScript('pocket'));
    }, 1000);
  }

  private getButtonScript(socialService: string) {
    let code = '';

    switch (socialService) {
      case 'twitter':
        code = `

        if (window.twttr) {

          window.twttr.widgets.load();

        } else {

          window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function(f) {
              t._e.push(f);
            };
            return t;
          }(document, "script", "twitter-wjs"));
        }
        `;
        break;
      case 'pocket':
        code = `

        (function(d,i){
          if(d.getElementById(i)){
            d.getElementById(i).remove();
          }

          var j=d.createElement("script");
          j.id=i;
          j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";
          var w=d.getElementById(i);
          d.body.appendChild(j);

        })(document,"pocket-btn-js");
        `;
        break;
      default:
        return null;
    }

    const script = document.createElement('script');
    const textNode = document.createTextNode(code);
    script.appendChild(textNode);
    console.log(script);
    return script;
  }
}
