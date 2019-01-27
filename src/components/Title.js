import React, { Component } from 'react';


class Title extends Component {
    constructor(props) {
        super(props);
        // this.title = props.title;

        // this.state = {
        //     title: props.title
        // }
    };

    // static navigationOptions = ({ navigation }) => {
    //   const { state } = navigation;
    //
    //   return {
    //     // title: `${state.params && state.params.title ? state.params.title : 'BASE TITLE'}`,
    //   };
    // };

    componentDidUpdate(props) {
        console.log(props);
        this.title = "hej;"
    }
    componentWillReceiveProps(nextProps) {
      // const title = nextProps.YOUR_NEXT_CONDITION ? 'TITLE A' : 'TITLE B';
      // this.props.navigation.setParams({ title });
    }


    render() {
        return (
            <div>

            </div>
        );
    };

}

export default Title;
