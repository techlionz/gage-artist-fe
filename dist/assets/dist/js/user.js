$('.two-decimal').change(function(event){
    if( this.value == "") {
        return ;
    }
    if( this.value > 100.0 ) {
        this.value = 100 ;
    }
    else if( this.value < 0 ){
        this.value = 0 ;
    }
    $(this).val(parseFloat(this.value).toFixed(2) ) ;
})