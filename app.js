// Alternância de navegação responsiva
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('primary-navigation');

menuToggle.addEventListener('click', () => {
	const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
	menuToggle.setAttribute('aria-expanded', !expanded);
	navLinks.classList.toggle('open');
	// Gerencie o foco do teclado para os itens de menu na alternância
	const links = Array.from(navLinks.querySelectorAll('a'));
	if (!expanded) {
        links.forEach(link => link.setAttribute('tabindex', '0'));
        links[0].focus();
		} else {
        links.forEach(link => link.setAttribute('tabindex', '-1'));
        menuToggle.focus();
	}
});

// Definir inicialmente o NAV Links Tabindex como -1 para obter acessibilidade em NAV móvel
if (window.innerWidth <= 767) {
	navLinks.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
}

document.getElementById('contactForm').addEventListener('submit', async function (e) {
	e.preventDefault();
	
	// Limpar mensagens de erro anteriores
	document.querySelectorAll('.error').forEach(el => el.textContent = '');
	document.getElementById('response-message').textContent = '';
	
	// Obtenha valores de formulário
	const name = document.getElementById('nameInput').value.trim();
	const email = document.getElementById('emailInput').value.trim();
	const message = document.getElementById('messageInput').value.trim();
	
	// Validar entradas
	let valid = true;
	if (!name) {
		document.getElementById('name-error').textContent = 'O nome é necessário.';
		valid = false;
	}
	if (!email || !/\S+@\S+\.\S+/.test(email)) {
		document.getElementById('email-error').textContent = 'O email válido é necessário.';
		valid = false;
	}
	if (!message) {
		document.getElementById('message-error').textContent = 'Mensagem é necessária.';
		valid = false;
	}
	
	if (!valid) return;
	
	// Envie dados para o back-end
	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, message })
		});
		
		const result = await response.json();
		document.getElementById('response-message').textContent = result.message;
		if (result.success) {
			document.getElementById('contactForm').reset();
		}
		} catch (error) {
		document.getElementById('response-message').textContent = 'Erro enviando mensagem. Por favor, tente novamente mais tarde.';
	}
});