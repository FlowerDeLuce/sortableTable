import React, { Component } from 'react';
 


export default class SortableTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            displayedData: this.props.data,
            sortBy: null,
            descending: false,
            edit: null,
            editRow: null,
            editCell: null,
            search: null,
        },
        this.sort = this.sort.bind(this),
        
        this.edit = this.edit.bind(this),
        this.save = this.save.bind(this),
        this.search = this.search.bind(this)    
    }
    
    
     edit(e){
        this.setState({edit: true,
                       editRow: e.target.dataset.row,
                       editCell: e.target.dataset.cell
                      }); 
         
       console.log(e.target.dataset.row, this.state.editCell)
       
     }
    
    save(e){
        e.preventDefault();
        var editRow = this.state.editRow;
        var editCell = this.state.editCell;
        var data = this.state.data.slice();
        var newCell = this.refs.input.value;
        data[editRow][editCell] = newCell;
        console.log(newCell);
        this.setState({
            edit: false,
            editRow: null,
            editCell: null
            
        })
    }
    
    sort(e){
            var column = e.target.cellIndex;
            var descending = this.state.sortBy === column && !this.state.descending;
            console.log('click', column);
            var data = this.state.data.slice();
          data.sort(function (a, b) {
              
              if (descending) {
                  return a[column] < b[column] ? 1 : -1;
                 
              }
              else {
                  return a[column] > b[column] ? 1 : -1;
              }
        
                });
            this.setState({data: data,
                          sortBy: column,
                          descending: descending});
            console.log(descending);
     }
    
    search(e){
       var oldData = this.state.data;
       var searchQuery = e.target.value.toLowerCase();
       
        console.log(searchQuery);
       var newData = oldData.filter(function(row){
           var searchValue = row[0].toLowerCase();
           return searchValue.indexOf(searchQuery) !== -1;
       });
        
        if (searchQuery) {
            this.setState({
                displayedData: newData
            })            
        }
        else{
            this.setState({
                displayedData: this.state.data
            })
        }
    
       
         
    }
    
    render(){
        var sortBy = this.state.sortBy;
        var descending = this.state.descending ;
        var editRow = this.state.editRow;
        var editCell = this.state.editCell;
        var search = this.search;
  
        return (
            <div>
                <input ref="search" onChange={search}/>
               
                <table>
                    <thead onClick={this.sort}>
                       <tr> {this.props.headers.map(function(title, idx){
                            if (sortBy === idx){
                                 title += descending ? ' \u2191' : ' \u2193'
                            }
                         return(<th> {title} </th>)
                        })}
                        </tr>
                    </thead>
                    <tbody onDoubleClick={this.edit} onSubmit={this.save}>
                            {this.state.displayedData.map(function(row, rowidx){
                             return(
                                <tr>
                                    {row.map(function(cell, idx){
                                            var content = cell;

                                                if (editRow==rowidx && editCell==idx){
                             return <form > <input ref="input" defaultValue={content}></input> </form>
                            }
                             else{
                                 return <td key={idx} data-row={rowidx} data-cell={idx}> {content} </td>
                             }

                                    })}
                                </tr>
                             )
                            })}
                    </tbody>
                </table>
            </div>        
        )
    }
}