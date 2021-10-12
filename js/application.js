var updateSubTotal = function (ele) {

    var price = parseFloat($(ele).children('.price').text());
    var amount = parseFloat($(ele).children('.amount').children('input').val());

    var subTotal = price * amount;
    $(ele).children('.subTotal').html('$' + subTotal);
    return subTotal;

}

var sum = function (acc, x) {
    return acc + x;
  };

var updateTotal = function() {

    var subTotals = [];

    $('.itemRow').each(function (i, ele) {

        var subTotal = updateSubTotal(ele);
        subTotals.push(subTotal);

    });

    if (subTotals.length === 0) {

        $('#total').html('');

    } else {

        var total = subTotals.reduce(sum);
        $('#total').html('$' + total);

    }

}



$(document).ready(function () {

    $('.itemRow').each(function (i, ele) {
  
        updateSubTotal(ele);
    
    });

    updateTotal();

    $('#addItem').on('submit', function (event) {

        event.preventDefault();
    
        var item = $(this).children('[name=item]').val();
        var price = $(this).children('[name=price]').val();
    
        $('tbody tr').last().before('<tr class="itemRow">' +
    
          '<td class="item">' + item + '</td>' +
          '<td class="price">' + price + '</td>' +
          '<td class="amount"><input class="col-5" type="number" value="1" /></td>' +
          '<td class="subTotal"></td>' +
          '<td class="text-right"><button class="btn btn-danger btn-sm px-3 remove"><i class="fas fa-times"></i></button></td>' +
    
          '</tr>');

        $('.itemRow').each(function (i, ele) {
  
            updateSubTotal(ele);
        
        });

        updateTotal();

        $(this).children('[name=item]').val('');
        $(this).children('[name=price]').val('');
    
    });
  
});

var timeout;

$(document).on('input', 'tr input', function () {

  clearTimeout(timeout);

  timeout = setTimeout(function () {

    $('.itemRow').each(function (i, ele) {
  
        if (updateSubTotal(ele) === 0) {

            $(this).closest('tr').remove();

        } else {

            updateSubTotal(ele);

        }
    
    });

    updateTotal();

  }, 750);

});

$(document).on('click', '.btn.remove', function (event) {

    $(this).closest('tr').remove();

    updateTotal();

});