import { gsap } from "gsap";

export function makeRowSwappy(props: {
  show: HTMLDivElement,
  remove: HTMLDivElement,
  complain: HTMLDivElement,
  onRemove: () => void,
  onComplain: () => void
}) {
  const showLayer = props.show
  const removeLayer = props.remove
  const complainLayer = props.complain
  let direction: 'left' | 'right' | null = null;

  function percentage(clickPoint: number) {
    const rect = removeLayer.getBoundingClientRect();
    const offsetX = clickPoint - rect.left;
    const percentFromLeft = (offsetX / rect.width) * 100;
    return percentFromLeft;
  }

  function onSwipe(e: TouchEvent) {
    if (e.touches.length == 1 && direction) {
      const currentX = e.touches[0].clientX;
      const refLeft = removeLayer.getBoundingClientRect().left;
      const refRight = removeLayer.getBoundingClientRect().right;
      if (direction == "left" && currentX < refRight) {
        gsap.set(showLayer, {
          x: currentX - refRight,
        })
      }
      if (direction == "right" && currentX > refLeft) {
        gsap.set(showLayer, {
          x: currentX - refLeft,
        })
      }
    }
  }

  function afterSwipe() {
    showLayer.removeEventListener("touchmove", onSwipe)
    showLayer.removeEventListener("touchend", afterSwipe)
    const stoppedAt = showLayer.getBoundingClientRect();
    const percentFromLeft = percentage(direction == "right" ? stoppedAt.left : stoppedAt.right)
    if ((direction == "left" && percentFromLeft > 20) || (direction == "right" && percentFromLeft < 80)) {
      gsap.to(showLayer, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      const width = showLayer.getBoundingClientRect().width;
      if (direction == "left") {
        gsap.to(showLayer, {
          x: -width,
          duration: 0.3,
          opacity: 0,
          ease: "power2.out",
          onComplete: props.onRemove
        })
      } else {
        gsap.to(showLayer, {
          x: width,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: ()=>{
            props.onComplain();
            gsap.to(showLayer, {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        })
      }
    }
    direction = null;
  }

  function onTouchStart(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length == 1) {
      const clientX = e.touches[0].clientX
      const percentFromLeft = percentage(clientX)
      if (percentFromLeft < 20 || percentFromLeft > 80) {
        direction = percentFromLeft < 20 ? 'right' : 'left';
        const candidate = direction == "left" ? removeLayer : complainLayer;
        const notCandidate = direction == "left" ? complainLayer : removeLayer;
        const tl = gsap.timeline();
        tl.set(candidate, { zIndex: 2 })
        tl.set(notCandidate, {
          zIndex: 1,
          onComplete: () => {
            showLayer.addEventListener("touchmove", onSwipe, { passive: false })
            showLayer.addEventListener("touchend", afterSwipe, { passive: false })
          }
        })
      }
    }
  }

   showLayer.addEventListener("touchstart",onTouchStart, {passive:false} )


  return onTouchStart;
}

export function removeSwappiness(
  showLayer: HTMLDivElement,
  touchstartHandler: (e:TouchEvent) => void
){
  showLayer.removeEventListener("touchstart", touchstartHandler);
}
