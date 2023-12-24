function validateForm() {
  $.datetimepicker.setLocale('ja');
  let ja = {
    ja:{
      months:[
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      dayOfWeek:[
        "日曜日",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日"
      ]
    }
  }

  $( ".datepicker" ).datetimepicker({
    timepicker:false,
    format: 'Y/m/d(D)',
    scrollMonth : false,
    scrollInput : false
  });

  $( ".datetimepicker").datetimepicker({
    scrollMonth : false,
    scrollInput : false,
    format: 'Y/m/d H:i(D)',
    step: 30
  });

  $.validator.addMethod('filesize', function (value, element, param) {
    let rightSize = true;
    let validFileTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png", "application/pdf"];
    for (let i=0; i<element.files.length; i++) {
      if (element.files[i].size > param.size) rightSize = false;
      if (validFileTypes.indexOf(element.files[i].type) == -1) rightSize = false;
    }
    return this.optional(element) || (rightSize)
  }, '3MB以下の画像やPDFファイルを選択してください。');

  $.validator.addMethod(
      "email",
      function(value, element, param) {
        var re = new RegExp(param.regexp);
        return this.optional(element) || re.test(value);
      },
      (param) => {return `${param.name}の形式が正しくありません。`});

  $.validator.addMethod(
      "postal_code",
      function(value, element, param) {
        var re = new RegExp(param.regexp);
        return this.optional(element) || re.test(value);
      },
      (param) => {return `${param.name}の形式が正しくありません。`});

  const formIds = Array.from($('.form-id'))
  formIds.forEach((item, index) => {
    const rulesData = $(`#${item.textContent}`).data('rules')
    const messagesData = $(`#${item.textContent}`).data('messages')
    $(`#${item.textContent}`).validate({
      errorElement: 'p',
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      ignore: [],
      rules: rulesData,
      messages: messagesData,
      errorPlacement: function(error, element) {
        element.closest('dd').find('.errors').text(error[0].innerHTML)
      },
      focusInvalid: false,
    });
  });
}
validateForm();

$('body').on('click', '.formContact .confirm-contact', function() {
  let this_form = $(this).closest('.formContact');
  change_to_confirm(this_form);
});

$('body').on('keypress', `.formContact input[type=text]`, function(e) {
  if(e.keyCode === 13) {
    let this_form = $(this).closest('.formContact');
    change_to_confirm(this_form);
    return false;
  }
});

function change_to_confirm(this_form) {
  if(this_form.valid()){
    this_form.prepend('<div class="wrapper_item"><div class="inner_item_txt"><p>入力内容をご確認の上、『送信する』ボタンを押してください。</p></div></div>');
    $('section.widget_form.block_form').not(this_form.closest('section')).addClass('hidden-in-contact');
    this_form.find(`.btn-in-form`).addClass('hidden-in-contact');
    this_form.find(`.btn-in-confirm`).removeClass('hidden-in-contact');
    this_form.siblings().addClass('hidden-in-contact');
    this_form.find(`dd p`).addClass('hidden-in-contact');
    $('.errors').text('')
    this_form.find(":input:text, select").each(function() {
      let val = $(this).val()
      if(val == null){
        val = ''
      }
      $(this).addClass('hidden-in-contact').after($("<span></span>").text(val.replace(/\r\n|\r|\n/g,"<br>")));
    });
    this_form.find("textarea").each(function() {
      let val = $(this).val().replace(/\r\n|\r|\n/g,"<br>")
      $(this).addClass('hidden-in-contact').after($("<span></span>").html(val));
    });
    this_form.find(":input:checkbox, :input:radio").each(function() {
      $(this).addClass('hidden-in-contact')
      $(this).next("label").addClass('hidden-in-contact')
      if($(this).is(":checked")){
        $(this).next("label").after($('<span style="margin-right: 35px;"></span').text( $(this).next("label").text()));
      }
    });
    this_form.find(":input:file").each(function() {
      $(this).addClass('hidden-in-contact');
      let validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
      if(this.files.length > 0) {
        for (let i = this.files.length - 1; i >= 0; i--) {
          let file = this.files[i];
          let fileType = file["type"];
          let filename = file["name"];
          let extension = filename.split('.')[1];
          if($.inArray(fileType, validImageTypes) > 0) {
            $(this).after('<img id="output" src=' + window.URL.createObjectURL(file) +' /></br>' + '<span>' + filename + '</span></br>');
          } else if (extension == 'pdf'){
            $(this).after('<span>' + filename + '</span></br>');
          }
        }
      }
    });
  }
  else {
    let inputs = Array.from(this_form[0].getElementsByTagName('input')).concat(Array.from(this_form[0].getElementsByTagName('textarea')))
    inputs.forEach(item => {
      if($(item).valid()) {
        $(item).closest('dd').find('.errors').text('')
      }
    })
  }
}

$('body').on('click', '.formContact .back-contact', function() {
  let this_form = $(this).closest('.formContact')
  $('section.widget_form.block_form').not(this_form.closest('section')).removeClass('hidden-in-contact');
  this_form.find(`.btn-in-confirm`).addClass('hidden-in-contact');
  this_form.find(`.btn-in-form`).removeClass('hidden-in-contact');
  this_form.siblings().removeClass('hidden-in-contact');
  this_form.find('div:first').remove();
  this_form.find(`dd p`).removeClass('hidden-in-contact');
  this_form.find(":input:text, select, textarea").each(function() {
    $(this).removeClass('hidden-in-contact').nextAll().not(`.errors`).not(this_form.find(`dd p`)).remove();
  });
  this_form.find(":input:checkbox, :input:radio").each(function() {
    $(this).removeClass('hidden-in-contact')
    $(this).next("label").removeClass('hidden-in-contact')
    if($(this).is(":checked")){
      $(this).next("label").next().remove();
    }
  });
  this_form.find(":input:file").each(function() {
    $(this).removeClass('hidden-in-contact').nextAll().not('.errors').remove();
  });
});

$( "body").on('submit', '.formContact', function(e) {
  e.preventDefault()
  let form_this = $(this);
  const form = this.closest("form")
  const contactDetailIds = form.getAttribute('data-contact-detail-ids').split(',')
  const contactId = form.getAttribute('data-contact_id')
  const idString = form.getAttribute('data-id_string')
  const grv3_secretkey = form_this.data('grv3_secretkey')
  const grv3_sitekey = form_this.data('grv3_sitekey')
  const contactDetails = form.getAttribute('data-contact-details')
  var tag4 = $('#client-info').attr("data-client-tag4");
  var tag5 = $('#client-info').attr("data-client-tag5");
  var conversion_tag2 = form_this.find(".conversion_tag2").text()
  var formData = new FormData();
  formData.append("contact_id", contactId)
  formData.append("id_string", idString)
  formData.append("contact_details", JSON.stringify(contactDetails))
  contactDetailIds.map((item) => {
    if(item.name != "") {
      formData.append("contact_details_ids[]", item)
      const inputs = form_this.find("[data-contact-detail-id='" + item + "'], [data-contact-detail-id='" + item + "[]']");
      if(inputs.length == 1) {
        if(inputs[0].getAttribute('type') === 'file') {
          for (let i = 0; i < inputs[0].files.length; i++)
            formData.append(item + "[]", inputs[0].files[i])
        } else {
          if(inputs[0].type === 'checkbox' || inputs[0].type === 'radio') {
            const lable = $(inputs[0]).next('label')
            let val = ''
            if($(inputs[0]).is(":checked")) {
              val = lable.text()
            }
            formData.append(item, val)
          }
          else {
            formData.append(item, inputs[0].value)
          }
        }
      }
      else {
        formData.append(item, inputValue(inputs))
      }
    }
  })
  if(grv3_secretkey != "" && grv3_sitekey != "") {
    grecaptcha.ready(function() {
      grecaptcha.execute(grv3_sitekey, {action: 'submit'}).then(function(token) {
        formData.append("g-token", token)
        submitForm(form, form_this, tag4, tag5, conversion_tag2, formData)
      });
    });
  }
  else {
    submitForm(form, form_this, tag4, tag5, conversion_tag2, formData)
  }
});

function submitForm(form, form_this, tag4, tag5, conversion_tag2, formData) {
  let request = new XMLHttpRequest();
  request.open("POST", form.getAttribute('data-api'));
  request.onload = function() {
    if (request.status == 201) {
      let data = $.parseJSON(request.response)
      const inner_item_txt = form_this.siblings('.inner_item_txt')
      inner_item_txt.removeClass('hidden-in-contact').append("<p class='done_message pre-wrap'></p><p class='conversion_tag pre-wrap'></p><p class='conversion_tag2 pre-wrap'></p>");
      inner_item_txt.find('p').text('')
      inner_item_txt.find('.done_message').text(data['done_message'])
      inner_item_txt.find('.conversion_tag').text(data['conversion_tag'])
      if(conversion_tag2.length > 0) {
        inner_item_txt.find('.conversion_tag2').text(conversion_tag2)
      }
      form_this.siblings('.inner_item_txt').nextAll().addClass('hidden-in-contact');
      $('body').prepend(tag4);
      $('body').append(tag5);
    }
  }
  request.send(formData);
}

$("body").on('change', '.postal_code', function(e) {
  var addressElement = this.closest("form").getElementsByClassName("address")[0]
  $.ajax({
    url: `https://postal-codes-jp.azurewebsites.net/api/PostalCodes/${this.value}`,
    type: "GET",
    dataType: 'json',
    success: function(data) {
      const address = data[0].city.pref.name + data[0].city.name + data[0].name
      addressElement.value = address
    }
  })
});

function inputValue(inputs) {
  let value = ""
  const checkedInputs = Array.from(inputs).filter(item => item.checked)
  if(checkedInputs.length < 1) {
    return value
  }

  if(checkedInputs.length == 1) {
    value = checkedInputs[0].value
    return value
  }
  value = []
  checkedInputs.forEach(item => {
    value.push(item.value)
  })
  return value.join(',')
}
