// End date logic
$(document).ready(function() {

    var endDateDropdown = $('#endDateDropdown');

    var endDurationField = $('#endDurationField');
    var endDurationInput = endDurationField.find('input');
    var endDurationError = endDurationField.find('.validationError');

    var expiryDateField = $('#expiryDateField');
    var expiryDateInput = expiryDateField.find('input');
    var expiryDateError = expiryDateField.find('.validationError');

    function hideDurationField() {
        endDurationField.hide();
        endDurationError.remove();
        endDurationInput.val('');
    }

    function hideExpiryDateField() {
        expiryDateField.hide();
        expiryDateError.remove();
        expiryDateInput.val('');
    }

    endDateDropdown.change(function() {

        // Show/hide corresponding fields based on which end-date is selected
        var selectedValue = endDateDropdown.val();
        if (selectedValue === 'FIXED_DATE') {
            hideDurationField();
            expiryDateField.show();
        } else if (selectedValue === 'DURATION_BASE') {
            hideExpiryDateField();
            endDurationField.show();
        } else {
            hideDurationField();
            hideExpiryDateField();
        }
    });

    endDateDropdown.change();

});


// End date same as price guarantee logic
$(document).ready(function() {
    var priceGuaranteeEndDateInput = $('#priceGuaranteeEndDate');
    var endDateSameAsPriceGuarantee = $('input[name="endDateSameAsPriceGuarantee"]');
    endDateSameAsPriceGuarantee.change(function() {
        if (this.checked === true) {
            priceGuaranteeEndDateInput.hide();
            priceGuaranteeEndDateInput.val('');
        } else {
            priceGuaranteeEndDateInput.show();
        }
    });

    endDateSameAsPriceGuarantee.change();
});