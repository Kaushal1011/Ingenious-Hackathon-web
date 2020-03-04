$.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Only letters allowed");



$.validator.addMethod("duplicateEmail", function (value, element)
{
    var valid = true;
    $.ajax({url: js_base + 'ajax/check_duplicate',
        data: {field: 'email', value: value},
        async: false,
        method: 'post',
        beforeSend: function () {
            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/assets/img/loader.gif"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('#loader_' + $(element).attr('name')).remove();
            }, 500);
        },
        success: function (msg) {
            valid = msg === "true" ? true : false
        }
    });
    return valid;
}, 'Email ID already registered');

$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than 500KB');


$.validator.addMethod("nameRequired", $.validator.methods.required, "Enter Insturctor Name");
$.validator.addMethod("emailRequired", $.validator.methods.required, "Enter Insturctor Email");
$.validator.addMethod("phoneRequired", $.validator.methods.required, "Enter Insturctor Phone");
$.validator.addMethod("profileRequired", $.validator.methods.required, "Enter Insturctor Profile");
$.validator.addMethod("photoRequired", $.validator.methods.required, "Upload Insturctor Photograph");


$.validator.addClassRules({
    instructor_name: {
        nameRequired: true
    },
    instructor_email: {
        emailRequired: true
    },
    instructor_phone: {
        phoneRequired: true,
        digits: true,
        minlength: 10,
        maxlength: 10
    },
    instructor_profile: {
        profileRequired: true
    },
    instructor_photo: {
        photoRequired: true,
        filesize: 524288,
        accept: "image/jpg,image/jpeg,image/png"
    }
});


$("#isp_form").validate({
    onkeyup: false,
    rules: {
        course_title: {
            required: true
        },
        abstract: {
            required: true
        },
        outline: {
            required: true
        },
        methodology: {
            required: true
        },
        academic_concept: {
            required: true
        },
        learning_outcome: {
            required: true
        },
        tangible_outcome: {
            required: true
        },
        instructor_name: {
            required: true
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            digits: true,
            required: true,
            minlength: 10,
            maxlength: 10
        },
        brief_profile: {
            required: true
        },
        why_teaching: {
            required: true
        },
        photograph: {
            required: true,
            filesize: 524288,
            accept: "image/jpg,image/jpeg,image/png"
        }
    },
    messages: {
        course_title: "Enter course title.",
        abstract: "Enter abstract.",
        outline: "Enter outline.",
        methodology: "Enter methodology.",
        academic_concept: "Enter academic concept.",
        learning_outcome: "Enter learning outcome.",
        tangible_outcome: "Enter tangible outcome.",
        instructor_name: "Enter instructor name.",
        email: {required: "Enter valid email address."},
        phone: {required: "Only numbers (10 digits)."},
        brief_profile: "Enter your brief profile.",
        why_teaching: "This field is required.",
        photograph: {required: 'Please upload your photograph in valid image format', accept: 'Please upload JPEG or PNG format only.'},
    },
    errorPlacement: function (error, element)
    {
        error.insertAfter(element);
    },
    submitHandler: function (form)
    {
        if (grecaptcha.getResponse() == "") {
            alert("Please validate the captcha");
            return false;
        } else {
            form.submit();
        }
    }
});

$("#register-inquiry-frm").submit(function (e) {
    e.preventDefault();
}).validate({
    onkeyup: false,
    rules: {
        name: {
            required: true
        },
        institution: {
            required: true
        },
        email: {
            required: true,
            email: true,
        },
        mobile: {
            digits: true,
            required: true,
            minlength: 10,
            maxlength: 10
        }
    },
    messages: {
        name: "Enter your name.",
        institution: "Enter institution name.",
        email: {required: "Enter valid email address."},
        mobile: {required: "Only numbers (10 digits)."}
    },
    errorPlacement: function (error, element)
    {
        error.insertAfter(element);
    },
    submitHandler: function (form)
    {
        $('.loader-bg').fadeIn();
        if (grecaptcha.getResponse() == "") {
            alert("Please validate the captcha");
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: base_url + 'ajax/undergrade_submit',
                data: $("#register-inquiry-frm").serialize(),
                success: function (response) {
                    $('.loader-bg').fadeOut();
                    if (response == 'success') {
                        $("#register-inquiry-frm").fadeOut();
                        $('#form_response').html('<h4 style="color:white">Thanks for your interest in Ahmedabad University. Look out for our emails on the latest information and news from our campus.</h4>')
                    } else
                    {
                        $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">There was some problem, please try again after sometime.</div>')
                    }
                },
            });
        }
        return false;
    }
});

$.validator.addMethod("duplicateEmail", function (value, element)
{
    var valid = true;
    $.ajax({url: base_url + 'ajax/check_duplicate',
        data: {field: 'email', value: value},
        async: false,
        method: 'post',
        beforeSend: function () {
            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + base_url + '/assets/images/loader1.apng"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('#loader_' + $(element).attr('name')).remove();
            }, 500);
        },
        success: function (msg) {
            valid = msg === "true" ? true : false
        }
    });
    return valid;
}, 'Email ID already registered');

$.validator.addMethod("duplicateMobile", function (value, element)
{
    var valid = true;
    $.ajax({url: base_url + 'ajax/check_duplicate',
        data: {field: 'mobile', value: value},
        async: false,
        method: 'post',
        beforeSend: function () {
            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + base_url + '/assets/images/loader1.apng"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('#loader_' + $(element).attr('name')).remove();
            }, 500);
        },
        success: function (msg) {
            valid = msg === "true" ? true : false
        }
    });
    return valid;
}, 'Mobile number already registered');

$.validator.addMethod("validateCaptcha", function (value, element)
{
    var valid = true;
    $.ajax({url: base_url + 'ajax/check_captcha',
        data: {value: value},
        async: false,
        method: 'post',
        beforeSend: function () {
            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + base_url + '/assets/images/loader1.apng"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('#loader_' + $(element).attr('name')).remove();
            }, 500);
        },
        success: function (msg) {
            valid = msg === "true" ? true : false
        }
    });
    return valid;
}, 'Invalid captcha code');


$("#admissions_2019_frm").submit(function (e) {
    e.preventDefault();
}).validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        institution: {
            required: true
        },
        email: {
            required: true,
            email: true,
            duplicateEmail: true
        },
        phone: {
            digits: true,
            required: true,
            minlength: 10,
            maxlength: 10,
            duplicateMobile: true
        },
        state: {
            required: true
        },
        agree: {
            required: true
        },
        captcha: {
            required: true,
            digits: true,
            validateCaptcha: true
        }
    },
    messages: {
        fname: "Enter your first name.",
        lname: "Enter your last name.",
        email: {required: "Enter valid email address."},
        phone: {required: "Only numbers (10 digits)."},
        state: "Select state.",
        agree: "Please accept.",
        captcha: {required: "Please enter 4 digit captcha code from image."}
    },
    errorPlacement: function (error, element)
    {
        //alert(element.tagName)
        //alert(element.prop("tagName"))
        if (element.attr('type') == 'checkbox')
        {
            error.insertAfter($(element).closest('div.checkbox'));
        } else if (element.hasClass('error'))
        {
            error.insertAfter($(element).closest('div.controls'));
        } else
        {
            error.insertAfter(element);
        }
        // error.insertAfter(element);
    },
    submitHandler: function (form)
    {

        $('.loader-bg').fadeIn();

        $.ajax({
            type: 'POST',
            url: base_url + 'ajax/admission_2019_submit',
            data: $("#admissions_2019_frm").serialize() + '&parent_url=' + window.parent.location.href,
            success: function (response) {
                $('.loader-bg').fadeOut();
                //window.parent.closeModal();
                $('#myModal', window.parent.document).modal('hide');
                if (response == 'success') {
                    $("#admissions_2019_frm").fadeOut();
                    $('#form_response').html('<h4 style="color:#252525">Thanks for your interest in Ahmedabad University. Look out for our emails on the latest information and news from our campus.</h4>')
                } else if (response == 'fail_captcha')
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">Invalid captcha code.</div>')
                } else
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">There was some problem, please try again after sometime.</div>')
                }

            },
        });
        return false;
    }
});


$("#admissions_2019_frm1").submit(function (e) {
    e.preventDefault();
}).validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        institution: {
            required: true
        },
        email: {
            required: true,
            email: true,
            duplicateEmail: true
        },
        phone: {
            digits: true,
            required: true,
            minlength: 10,
            maxlength: 10,
            duplicateMobile: true
        },
        state: {
            required: true
        },
        city: {
            required: true
        },
        enquiry: {
            required: true
        },
        programme_interest: {
            required: true
        },
        currently_pursuing: {
            required: true
        },
        agree: {
            required: true
        },
        captcha: {
            required: true,
            digits: true,
            validateCaptcha: true
        }
    },
    messages: {
        fname: "Enter your first name.",
        lname: "Enter your last name.",
        email: {required: "Enter valid email address."},
        phone: {required: "Only numbers (10 digits)."},
        state: "Select state.",
        city: "Enter your city.",
        programme_interest: "Please select one.",
        currently_pursuing: "Please select one.",
        enquiry: "Please enter your enquiry.",
        agree: "Please accept.",
        captcha: {required: "Please enter 4 digit captcha code from image."}
    },
    errorPlacement: function (error, element)
    {
        //alert(element.tagName)
        //alert(element.prop("tagName"))
        if (element.attr('type') == 'checkbox')
        {
            error.insertAfter($(element).closest('div.checkbox'));
        } else if (element.hasClass('error'))
        {
            error.insertAfter($(element).closest('div.controls'));
        } else
        {
            error.insertAfter(element);
        }
        // error.insertAfter(element);
    },
    submitHandler: function (form)
    {
//        if (grecaptcha.getResponse() == "") {
//            alert("Please validate the captcha");
//            return false;
//        } else {
        $('.loader-bg').fadeIn();

        $.ajax({
            type: 'POST',
            url: base_url + 'ajax/admission_2019_submit1',
            data: $("#admissions_2019_frm1").serialize() + '&parent_url=' + window.parent.location.href,
            success: function (response) {
                $('.loader-bg').fadeOut();
                //window.parent.closeModal();
                $('#myModal', window.parent.document).modal('hide');
                if (response == 'success') {
                    $("#admissions_2019_frm1").fadeOut();
                    $('#form_response').html('<p><em>Thank you for your interest in Ahmedabad University. Look out for our emails on the latest information and news from our campus.</em></p>')
                } else if (response == 'fail_captcha')
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">Invalid captcha code.</div>')
                } else
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">There was some problem, please try again after sometime.</div>')
                }

            },
        });
        //}
        return false;
    }
});


$("#financial_aid_2019_frm").submit(function (e) {
    e.preventDefault();
}).validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        institution: {
            required: true
        },
        email: {
            required: true,
            email: true,
           // duplicateEmail: true
        },
        phone: {
            digits: true,
            required: true,
            minlength: 10,
            maxlength: 10,
          //  duplicateMobile: true
        },
        state: {
            required: true
        },
        agree: {
            required: true
        },
        captcha: {
            required: true,
            digits: true,
            validateCaptcha: true
        }
    },
    messages: {
        fname: "Enter your first name.",
        lname: "Enter your last name.",
        email: {required: "Enter valid email address."},
        phone: {required: "Only numbers (10 digits)."},
        state: "Select state.",
        agree: "Please accept.",
        captcha: {required: "Please enter 4 digit captcha code from image."}
    },
    errorPlacement: function (error, element)
    {
        //alert(element.tagName)
        //alert(element.prop("tagName"))
        if (element.attr('type') == 'checkbox')
        {
            error.insertAfter($(element).closest('div.checkbox'));
        } else if (element.hasClass('error'))
        {
            error.insertAfter($(element).closest('div.controls'));
        } else
        {
            error.insertAfter(element);
        }
        // error.insertAfter(element);
    },
    submitHandler: function (form)
    {

        $('.loader-bg').fadeIn();

        $.ajax({
            type: 'POST',
            url: base_url + 'ajax/financial_aid_submit',
            data: $("#financial_aid_2019_frm").serialize() + '&parent_url=' + window.parent.location.href,
            success: function (response) {
                $('.loader-bg').fadeOut();
                //window.parent.closeModal();
                $('#myModal', window.parent.document).modal('hide');
                if (response == 'success') {
                    $("#financial_aid_2019_frm").fadeOut();
                    $('#form_response').html('<h4 style="color:#252525">We have received your request to know about our Financial Aid Policy. Look out for our emails sent from the Office of Admissions and Financial Aid with more information and updates.</h4>')
                } else if (response == 'fail_captcha')
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">Invalid captcha code.</div>')
                } else
                {
                    $('#form_response').prepend('<div style="border-radius:0px; margin:15px" class="alert alert-warning">There was some problem, please try again after sometime.</div>')
                }

            },
        });
        return false;
    }
});

