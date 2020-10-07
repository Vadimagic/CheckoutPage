'use strict'

window.addEventListener('DOMContentLoaded', function () {

	let productPrice = document.querySelector('.order__section-product').querySelectorAll('.order__cost-number'),
		orderDiscount = document.querySelector('.order__cost-discount'),
		orderTotal = document.querySelector('.order-total'),
		sumTotal = document.querySelector('.order__cost-number-sum'),
		basketSum = document.querySelector('.header__catalog-basket-sum'),
		basketTotal = document.querySelector('.header__catalog-basket-total'),

		individual = document.querySelector('.data__face-individual'),
		entity = document.querySelector('.data__face-entity'),

		dataRadio = document.querySelector('.data__radio'),
		radioButtons = document.querySelectorAll('.data__radio__block-button'),
		radioBlocks = document.querySelectorAll('.data__radio__block'),
		orderDeliveryType = document.querySelector('.order-type'),
		orderDeliveryPrice = document.querySelector('.order__delivery-price'),

		firstName = document.querySelector('#first-name'),
		secondName = document.querySelector('#second-name'),
		phoneNumber = document.querySelector('#phone-number'),
		email = document.querySelector('#mailto'),
		mailError = document.querySelector('.data__block-hidden'),

		maps = document.querySelectorAll('.data__map'),
		selectMetro = document.querySelector('.select-metro'),
		options = document.querySelector('.select-metro').querySelectorAll('option'),

		headerBurger = document.querySelector('.header__burger'),
		headerNav = document.querySelector('.header__catalog__nav');



	function selectFace(a, b) {
		b.classList.remove('data__face-active');
		a.classList.add('data__face-active');
	}

	individual.addEventListener('click', function () {
		selectFace(individual, entity);
	});

	entity.addEventListener('click', function () {
		selectFace(entity, individual);
	});



	function inactiveRadioBlocks(a) {
		for (let i = a; i < radioBlocks.length; i++) {
			radioBlocks[i].classList.remove("data__radio__block-active");
		}
	}

	function activeRadioBlock(a) {
		radioBlocks[a].classList.add("data__radio__block-active");
		if (a === 2) {
			document.querySelector('.data__pickup').style.display = "block";
		} else {
			document.querySelector('.data__pickup').style.display = "none";
		}
	}

	function addRadioType(a) {
		orderDeliveryType.textContent = radioBlocks[a].querySelector('.data__radio-type').textContent;
	}

	function addRadioPrice(a) {
		orderDeliveryPrice.textContent = radioBlocks[a].querySelector('.data__radio-price').textContent;
	}

	addRadioPrice(2)

	dataRadio.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('data__radio__block-button')) {
			for (let i = 0; i < radioBlocks.length; i++) {
				if (target == radioButtons[i]) {
					inactiveRadioBlocks(0);
					activeRadioBlock(i);
					addRadioType(i);
					addRadioPrice(i);
					calcSumTotal();
					calcSumProducts();
					break;
				}
			}
		}
	});

	function basketTotalProduct() {
		basketTotal.textContent = productPrice.length;
	}
	basketTotalProduct();

	function calcSumProducts() {
		let sum = 0;
		for (let i = 0; i < productPrice.length; i++) {
			let number = productPrice[i].textContent.replace(/\s+/g, '');
			sum += +number;
		}
		addSumBasket(sum + +orderDeliveryPrice.textContent);

		return sum;
	}

	function addDiscount() {
		orderDiscount.textContent = calcSumProducts() * 0.05;
	}
	addDiscount();

	function addTotal() {
		orderTotal.textContent = calcSumProducts() - orderDiscount.textContent;
	}
	addTotal();

	function calcSumTotal() {
		sumTotal.textContent = +orderTotal.textContent + +orderDeliveryPrice.textContent;
	}
	calcSumTotal();

	function addSumBasket(sum) {
		sum = String(sum).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
		basketSum.textContent = sum;
	}



	function validateEmail() {
		let valid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		let address = email.value;
		if (valid.test(address) == false) {
			mailError.classList.remove('data__block-hidden-active');
		} else {
			mailError.classList.add('data__block-hidden-active');
		}
	}

	email.onblur = function () {
		validateEmail();
	};

	firstName.addEventListener('keypress', function () {
		let input = this;

		setTimeout(function () {
			let res = /[^а-яА-Я-]/g.exec(input.value);
			input.value = input.value.replace(res, '');
		}, 0);
	});

	secondName.addEventListener('keypress', function () {
		let input = this;

		setTimeout(function () {
			let res = /[^а-яА-Я-]/g.exec(input.value);
			input.value = input.value.replace(res, '');
		}, 0);
	});

	phoneNumber.addEventListener('focus', function () {
		let old = 0;
		phoneNumber.addEventListener('keydown', function () {
			let phoneLength = phoneNumber.value.length;


			if (phoneLength < old) {
				old--;
				if (phoneLength == 4 || phoneLength == 8) {
					phoneNumber.value = phoneNumber.value.slice(0, -1);
					old--;
					phoneLength--;
				}

				if (phoneLength == 11) {
					phoneNumber.value = phoneNumber.value.slice(0, -1);
					old--;
					phoneLength--;
				}
				return;
			}

			if (phoneLength == 3 || phoneLength == 7)
				phoneNumber.value = phoneNumber.value + " ";

			if (phoneLength == 10)
				phoneNumber.value = phoneNumber.value + "-";

			old++;
		});
	});

	function inactiveMaps(a) {
		for (let i = a; i < options.length; i++) {
			maps[i].classList.remove('data__map-active');
		}
	}

	function activeMap(a) {
		maps[a].classList.add("data__map-active");
	}

	selectMetro.addEventListener('change', function () {
		for (let i = 0; i < options.length; i++) {
			if (this.value == i) {
				inactiveMaps(0);
				activeMap(i);
				break;
			}
		}
	});

	headerBurger.addEventListener('click', function () {
		headerBurger.classList.toggle('active');
		headerNav.classList.toggle('active');
	});

});