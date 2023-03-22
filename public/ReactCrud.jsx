var CustomerData = React.createClass({   
  
    getInitialState: function () {  
      return { name: '' ,address: '',accountnumber: '',ifsc: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: []};  
    },  
     handleChange: function(e) {  
          this.setState({[e.target.name]: e.target.value});  
      },  
    
    componentDidMount() {  
     
      $.ajax({  
         url: "api/getdata",  
         type: "GET",  
         dataType: 'json',  
         ContentType: 'application/json',  
         success: function(data) {           
           this.setState({data1: data});   
             
         }.bind(this),  
         error: function(jqXHR) {  
           console.log(jqXHR);  
               
         }.bind(this)  
      });  
    },  
      
  DeleteData(id){  
    var CustomerDelete = {  
          'id': id  
             };        
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: CustomerDelete,  
        success: function(data) {  
          alert(data.data);  
           this.componentDidMount();  
    
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);   
               
              
        }.bind(this),  
        });  
      },  
     
      EditData(item){           
     this.setState({name: item.name,address:item.address,ifsc:item.ifsc,accountnumber:item.accountnumber,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});  
       },  
    
     handleClick: function() {  
     
     var Url="";  
     if(this.state.Buttontxt=="Save"){  
        Url="/api/savedata";  
         }  
        else{  
        Url="/api/Updatedata";  
        }  
        var CustomerData = {  
          'name': this.state.name,  
          'address':this.state.address, 
          'accountnumber':this.state.accountnumber, 
          'ifsc':this.state.ifsc,
          'email':this.state.email,  
          'contact':this.state.contact,  
          'id':this.state.id,  
            
      }  
      $.ajax({  
        url: Url,  
        dataType: 'json',  
        type: 'POST',  
        data: CustomerData,  
        success: function(data) {         
            alert(data.data);         
            this.setState(this.getInitialState());  
            this.componentDidMount();  
             
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);       
        }.bind(this)  
      });  
    },  
    
    render: function() {  
      return (   
        <div  className="container"  style={{marginTop:'50px'}}>  
         <p className="text-center" style={{fontSize:'25px'}}><b>GANESH BANK DATA MANAGEMENT SYSTEM</b></p>
      
             <form>  
                    <div className="col-sm-12 col-md-12"  style={{marginLeft:'100px'}}>   
                    
    <table className="table-bordered">  
       <tbody>  
      <tr>  
        <td><b>Name</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
            <input type="hidden" value={this.state.id}    name="id"  />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Accountnumber</b></td>  
        <td>  
        <input type="text" minlength="10" className="form-control" value={this.state.accountnumber}  name="accountnumber" onChange={ this.handleChange } required/>  
        </td>  
      </tr>  

      <tr>  
        <td><b>IFSC</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.ifsc}  name="ifsc" onChange={ this.handleChange } required/>  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Address</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } required/>  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Email</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } required/>  
        </td>  
      </tr>  
    
    
      <tr>  
        <td><b>Contact</b></td>  
        <td>  
          <input type="text" maxlength="10" className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } required />  
        </td>  
      </tr>  
    
      <tr>  
        <td></td>  
        <td>  
          <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
        </td>  
      </tr>  
    
   </tbody>  
      </table>  
  </div>  
     
    
  <div className="col-sm-12 col-md-12 "  style={{marginTop:'100px',marginLeft:'50px', width:'500px',height: '100px'}} >  
     
   <table className="table-bordered" style={{width:"200%"}}><tbody>  
     <tr><th><b>S.No</b></th><th><b>NAME</b></th><th><b>ACCOUNTNUMBER</b></th><th><b>IFSC</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
      {this.state.data1.map((item, index) => (  
          <tr key={index}>  
             <td>{index+1}</td>   
            <td>{item.name}</td>  
            <td>{item.accountnumber}</td>
            <td>{item.ifsc}</td>                      
            <td>{item.address}</td>  
            <td>{item.email}</td>  
            <td>{item.contact}</td>  
             <td>   
              
             <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item) }}>Edit</button>      
            </td>   
            <td>   
               <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>  
            </td>   
          </tr>  
      ))}  
      </tbody>  
      </table>  
       </div>  
  </form>          
        </div>  
      );  
    }  
  });  
    
  ReactDOM.render(<CustomerData  />, document.getElementById('root'))  