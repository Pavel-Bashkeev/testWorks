export class Modal {
	constructor(options) {
		let dftOptions = {
			isOpen: () => {},
			isClose: () => {},
			selector: '.modal',
		};
		this.options = Object.assign(dftOptions, options);
		this.modal = document.querySelector(dftOptions.selector);
		this.speed = 350;
		this.animation = false;
		this.isOpen = false;
		this.modalContainer = false;
		this.events();
	}
	events() {
		if (this.modal) {
			document.addEventListener('click', (event) => {
				const clickedElement = event.target.closest('[data-modal-btn]');
				if (clickedElement) {
					let target = clickedElement.dataset.modalBtn;
					console.log(target);
					let animation = clickedElement.dataset.animation;
					let speed = clickedElement.dataset.speed;

					this.animation = animation ? animation : 'fade';
					this.speed = speed ? parseInt(speed) : 300;
					this.modalContainer = document.querySelector(`[data-modal=${target}]`);
					this.open();
					return;
				};

				if (event.target.closest('.modal-close')) {
					this.close();
					return;
				}
			});
			window.addEventListener('keyup', (event) => {
				if(event.which == 27){
					if(this.isOpen){
						this.close();
					}
				}
			});
			this.modal.addEventListener('click', (event) => {
				if(!event.target.classList.contains('modal__container') && !event.target.closest('.modal__container') && this.isOpen){
					this.close();
				}
			})
		}
	}
	open(selector) {
		this.modal.style.setProperty('--animation-time', `${this.speed/1000}s`);
		// console.log('🚀 ~ this.modal.style.getPropertyValue', this.modal.style.getPropertyValue('--animation-time'));
		this.modal.classList.add('is-open');
		this.disableScroll();

		this.modalContainer.classList.add('modal-open');
		this.modalContainer.classList.add(this.animation);

		setTimeout(() => {
			this.modalContainer.classList.add('anim-run');
			this.options.isOpen(this);
			this.isOpen = true;
		}, this.speed);
	}
	close() {
		if (this.modalContainer) {
			this.modalContainer.classList.remove('anim-run');
			setTimeout(()=>{
				this.modalContainer.classList.remove(this.animation);
			this.modal.classList.remove('is-open');
			this.modalContainer.classList.remove('modal-open');
			this.enableScroll();
			this.options.isClose(this);
			this.isOpen = false;
			}, this.speed)
		}
	}
	disableScroll() {
		this.lockPadding();
		document.body.classList.add('disable-scroll');
	}
	enableScroll() {
		this.unlockPadding();
		document.body.classList.remove('disable-scroll');
	}
	lockPadding() {
		let paddingOffset = window.innerWidth - document.documentElement.clientWidth + 'px';
		console.log('🚀 ~ paddingOffset', paddingOffset)
		document.body.style.paddingRight = paddingOffset;
	}
	unlockPadding() {
		document.body.style.paddingRight = 0;
	}
}
