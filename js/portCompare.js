function portCompare() {
  var newData = $('input, select', document.forms['Unit_2403_0_0']);
  var oldData = newData.clone();

  newData.filter(':visible').not('[type="checkbox"]')
      .removeAttr('onchange').on({
         focus: function(){
           //console.log(this); 
           if (this.placeholder == '') {
             this.placeholder = this.value;
           }
         },
         change: function(){
           if (this.placeholder == '' || this.placeholder == null) {
             //if (this.value != '' || this.value != null){
               //console.log('null ph ' +this.placeholder);
               $(this).parent().parent().attr('class','success');
             //}
           }
           else if (this.placeholder != '' || this.placeholder != null){
             if (this.value == '') {
               //console.log('now null ' +this.placeholder);
               $(this).parent().parent().attr('class','error');
             }
             else if (this.value != '' | this.value != null){
               //console.log('not null ' + this.placeholder);
               $(this).parent().parent().attr('class','warning');
             }
           }
           
           $('[name="dbsDescription"]', $(this).parent().parent())
             .each(function(i,e){
               console.log(e.value +'  '+ this.value);
               if (this.value === e.value){
                 //console.log(this.value);
                 //console.log(e.value);
                 $(e).parent().parent().attr('class','info');
                 $(this).parent().parent().attr('class','info');
               }
             }.bind(this)).bind(this);

           //console.log(this);
         }
      })
}
portCompare();
