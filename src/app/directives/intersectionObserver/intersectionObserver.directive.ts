import {
    Directive,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
  } from '@angular/core'
  import { Observable, Subscription } from 'rxjs'
  
  @Directive({
    selector: '[appIntersectionObserver]',
  })
  export class IntersectionObserverDirective implements OnDestroy {
    private shouldEmit: boolean = false

    @Input() offset: number = 0;
    @Input() set active(value: boolean) {
      if (value && !this.subscription) {
        this.subscription = this.createAndObserve();
      } else if (!value && this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      this.shouldEmit = value

   }
    @Output() isIntersecting = new EventEmitter<boolean>()
  
    
    public _isIntersecting: boolean = false
    public subscription?: Subscription
  
    constructor (private element: ElementRef<Element>) {
    }
  
    ngOnDestroy () {
      if(this.subscription) {
        this.subscription.unsubscribe()
      }
    }
  
    createAndObserve () {

      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: `-${100 + this.offset}% 0px ${this.offset}% 0px`,
        threshold: 0,
      }
  
      return new Observable<boolean>(subscriber => {
        const intersectionObserver = new IntersectionObserver(entries => {

          const { isIntersecting } = entries[0]
          if (isIntersecting && this.shouldEmit) {
            subscriber.next(true);
          } else {
            subscriber.next(false);
            intersectionObserver.disconnect();
          }
        }, options)
  
        intersectionObserver.observe(this.element.nativeElement)
  
        return {
          unsubscribe () {
            intersectionObserver.disconnect()
          },
        }
      })
        .subscribe(insideElementOffset => {
          this.isIntersecting.emit(!insideElementOffset)
          this._isIntersecting = !insideElementOffset
        })
    }
  }
  