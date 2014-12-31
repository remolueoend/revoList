/**
 * Created by remo on 31/12/14.
 */

'use strict';

revoList.app.factory('validator', [function(){

    /**
     * Appends errors to a form instance.
     * @param {FormController} form
     * @param {Object} serverResponse
     */
    function validateForm(form, serverResponse){
        if(form){
            if(serverResponse.status === 409){
                var errors = serverResponse.data.error.validation;
                for(var r in errors){
                    if(errors[r].length)
                        form[r].$dirty = true;
                    form[r].$setValidity('serverError', false);
                    form[r].$error['serverError'] = errors[r][0];
                }
            }else{
                if(form.title)
                form.title.$setValidity('serverError', true);
            }
        }
    }

    return {
        validateForm: validateForm
    }

}]);