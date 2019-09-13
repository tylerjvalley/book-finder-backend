import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../../Components/SearchResults/SearchResults';
import axios from 'axios';
import { apiKey, bookSearchUrl } from '../../assets/assets';


class Main extends Component {

    state = {
        search: '',
        books: [],
    }

    handleSearchInput = (e) => {
        this.setState({search: e.target.value})
    }

    handleSubmit = () => {
        const request = `${bookSearchUrl}${this.state.search}&key=${apiKey}`;
        let isValid = true;

        axios.get(request)
        .then(res => {
            res.data.items.forEach(item => {
                if (!item.volumeInfo.authors) {
                    isValid = false;
                }
                
            })

            //check for valid search based on if the searched book has authors.
            if (isValid) {
                this.setState({ books: res.data.items })
            } else {
                alert('no results found');
            }
           
           
        })
        .catch(error => {
            console.log(error);          
        });

    }
    

    render() {

        return (
            <>
            <SearchForm search={this.handleSearchInput}
                        submit={this.handleSubmit} /> 
            
            <SearchResults books={this.state.books}/>
            
        

            </>

            
        )
    }
}


export default Main;