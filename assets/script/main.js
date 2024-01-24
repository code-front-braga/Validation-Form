class Form {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validFields = this.isValidFields();
    const validPasswords = this.isValidPasswords();

    if (validFields && validPasswords) {
      // this.form.submit();
    }
  }

  isValidPasswords() {
    let validator = true;

    const password = this.form.querySelector('.password');
    const repeatPassword = this.form.querySelector('.repeat-password');

    if (password.value !== repeatPassword.value) {
      validator = false;
      this.createError(password, 'Campos senha e repetir senha devem ser iguais.');
      this.createError(repeatPassword, 'Campos senha e repetir senha devem ser iguais.');
    }

    if (password.value.length < 6 || password.value.length > 12) {
      validator = false;
      this.createError(password, 'Senha precisa conter entre 6 e 12 caracteres.');
    }
    return validator;
  }

  isValidFields() {
    let validator = true;

    for (let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let field of this.form.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createError(field, `Campo ${label} não pode estar em branco.`);
        validator = false;
      }

      if (field.classList.contains('cpf')) {
        if (!this.validateCPF(field)) validator = false;
      }

      if (field.classList.contains('user')) {
        if (!this.validateUser(field)) validator = false;
      }
    }
    return validator;
  }

  validateUser(field) {
    const user = field.value;
    let validator = true;

    if (user.length < 3 || user.length > 12) {
      this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      validator = false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números.');
      validator = false;
    }
    return validator;
  }

  validateCPF(field) {
    const cpf = new CPFConstructor(field.value);

    if (!cpf.validation()) {
      this.createError(field, 'CPF Inválido');
      return false;
    }
    return true;
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const validate = new Form();
