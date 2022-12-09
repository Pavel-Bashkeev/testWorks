export class Tabs {
	constructor(selector, options) {
		let dftOptions = {
			isChanged: () => {},
			activeTabOnStart: false,
			selectorActiveTab: null,
		};
		this.options = Object.assign(dftOptions, options);
		this.selector = selector;
		this.tabs = document.querySelector(`[data-tabs-block=${selector}]`);
		if (this.tabs) {
			this.tabsList = this.tabs.querySelector('.tabs__nav');
			this.tabsBtns = this.tabs.querySelectorAll('.tabs__item-btn');
			this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
		} else {
			console.error('Селектор data-tabs-block не существует');
			return;
		};
		this.check(); //проверка
		this.init(); //иницилизация
		this.events(); // события
	}
	events() {
		this.tabsBtns.forEach((el, i) => {
			el.addEventListener('click', () => {
				let activeTabBtn = this.tabsList.querySelector('[area-selected]');

				if (el !== activeTabBtn) this.switchTabs(el, activeTabBtn);
			})
			el.addEventListener('keydown', (event) => {
				let index = Array.prototype.indexOf.call(this.tabsBtns, event.currentTarget);
				console.log('🚀 ~ index', index)

				let dir = null;

				if (event.which === 37) dir = index - 1;
				// if(event.which === 38) dir = 'up';
				if (event.which === 39) dir = index + 1;
				if (event.which === 40) dir = 'down';

				// console.log('🚀 ~ dir', dir)
				if (dir !== null) {
					if (dir === 'down') {
						this.tabsPanels[i].focus();
					} else if (this.tabsBtns[dir]) {
						this.switchTabs(this.tabsBtns[dir], event.currentTarget);
					}
				}
			});
		});

	}
	switchTabs(newTab, oldTab = this.tabs.querySelector('[area-selected]')) {
		newTab.focus();
		newTab.removeAttribute('tabindex');
		newTab.setAttribute('area-selected', true);
		newTab.classList.add('tabs__item-btn--active');

		oldTab.setAttribute('tabindex', '-1');
		oldTab.removeAttribute('area-selected');
		oldTab.classList.remove('tabs__item-btn--active');

		let newIndex = Array.prototype.indexOf.call(this.tabsBtns, newTab);
		let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

		this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
		this.tabsPanels[newIndex].classList.add('tabs__panel--active');

		this.options.isChanged(this);
	}
	check() {
		if (this.selector !== this.tabs.dataset.tabsBlock) {
			console.error('Не совпадют значения data-tabs-block');
			return;
		}
		if (document.querySelectorAll(`[data-tabs-block=${this.selector}]`).length > 1) {
			console.error('Значане data-tabs-block не уникально');
			return;
		}
		if (this.tabsBtns.length !== this.tabsPanels.length) {
			console.error('Колличество табов не совподают с колличество вкладок');
		}
	}
	init() {
		this.tabsList.setAttribute('role', 'tablist');

		this.tabsBtns.forEach((el, i) => {
			el.setAttribute('role', 'tab');
			el.setAttribute('tabindex', '-1');
			el.setAttribute('id', `${this.selector}${i+1}`);
			el.classList.remove('tabs__item-btn--active');
		});

		this.tabsPanels.forEach((el, i) => {
			el.setAttribute('role', 'tabpanel');
			el.setAttribute('tabindex', '-1');
			el.setAttribute('area-labelledby', this.tabsBtns[i].id);
			el.classList.remove('tabs__panel--active');
		});

		if (this.options.activeTabOnStart) {
			let activeTab = this.tabs.querySelector(this.options.selectorActiveTab);
      
			activeTab.classList.add('tabs__item-btn--active');
			activeTab.removeAttribute('tabindex');
			activeTab.setAttribute('area-selected', true);

			this.tabs.querySelector(`[area-labelledby=${activeTab.id}]`).classList.add('tabs__panel--active');
			return;
		}
		this.tabsBtns[0].classList.add('tabs__item-btn--active');
		this.tabsBtns[0].removeAttribute('tabindex');
		this.tabsBtns[0].setAttribute('area-selected', true);

		this.tabsPanels[0].classList.add('tabs__panel--active');
	}
}