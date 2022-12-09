export default class Accordion {
	constructor(selector, option) {
		let dftOption = {
			visibileOneContent: false,
			visibileItem: null,
		};
		this.option = Object.assign(dftOption, option);
		this.selector = selector;
		this.accordion = document.querySelector(`[data-accordion=${selector}]`);
		if (this.accordion) {
			this.speed = this.accordion.dataset.animationSpeed ?? 700;
			this.accordionItems = this.accordion.querySelectorAll('[data-accordion-item=accordion-item]');
			this.accordionBtns = this.accordion.querySelectorAll('[data-accordion-btn]');
			this.accordionContent = this.accordion.querySelectorAll('[data-accordion-content]');
		} else{
			console.error('Селектора data-accordion не существует');
		}

		this.check();
		this.init(this.option.visibileItem);
	}
	check() {
		if(this.accordionBtns.length !== this.accordionContent.length){
			console.error('Колличество кнопок не совподает с колличеством контента');
		}
		if (!this.accordionBtns) {
			console.error('Требуется у кнопок прописать data-accordion-btn');
		}
		if (!this.accordionContent) {
			console.error('Требуется у блока с контентом прописать data-accordion-content');
		}
		if (!this.accordionItems) {
			console.error('Требуется у елемента одного аккордиона прописать data-accordion-item="accordion-item"');
		}
	}
	event() {
		this.accordionBtns.forEach((el) => {
			el.addEventListener('click', () => {
				!this.option.visibileOneContent ? this.showContentOne(el) : this.showContentStagger(el);
			});
		});
	}


	showContent(parent, content) {
		
		parent.classList.add('open');
		content.style.maxHeight = `${content.scrollHeight}px`;
	}

	showContentOne(elemBtn) {
		
		const content = document.querySelector(`[data-accordion-content=${elemBtn.dataset.accordionBtn}]`);
		elemBtn.parentNode.classList.toggle('open');
		if (elemBtn.parentNode.classList.contains('open')) {
			content.style.maxHeight = `${content.scrollHeight}px`;
			return;
		}
		content.style.maxHeight = null;
		
	}

	showContentStagger(elemBtn) {
		this.accordionItems.forEach(el => {
			el.classList.remove('open');
		});
		this.accordionContent.forEach(el => {
			el.style.maxHeight = null;
		})
		this.showContentOne(elemBtn);
	}
	init(visibileItem = null) {
		this.accordion.style.setProperty('--transition-anim', `${this.speed/1000}s`)
		this.accordionItems.forEach((el, i) => {
			const content = el.querySelector('[data-accordion-content]')
			parseInt(visibileItem) === i + 1 ? this.showContent(el, content) : el.classList.remove('open');
		});

		for (let i = 0; i < this.accordionBtns.length; i++) {
			this.accordionBtns[i].setAttribute('data-accordion-btn', `${this.selector}${i+1}`);
			this.accordionContent[i].setAttribute('data-accordion-content', `${this.selector}${i+1}`);
		}
		this.event();
	}
}


// const accordion = new Accordion('accordion1', {
// 	visibileItem: 3,
// 	visibileOneContent: true
// });