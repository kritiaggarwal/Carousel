import React from 'react';
import Carousel from '../components/Carousel';
import { shallow, mount } from 'enzyme';
import * as Constants from '../constants/index';

describe('Carousel Component', () => {
    it('renders Carousel component without crashing', () => {
        const carousel = shallow(<Carousel />);

        const wrapper = mount(<Carousel />);
        wrapper.setState({ 'loading': false, 'isMobile': true });
        expect(wrapper.find('.carousel').length).toEqual(1);
    });

    it('Carousel component should have div with carousel class, when loading is \
        false & mobile view is true', () => {
            const wrapper = mount(<Carousel />);
            wrapper.setState({ 'loading': false, 'isMobile': true });
            expect(wrapper.find('.carousel').length).toEqual(1);
        });

    it('Carousel component should have div with loader-container class, when loading is true', () => {
        const wrapper = mount(<Carousel />);
        wrapper.setState({ 'loading': true });
        expect(wrapper.find('.loader-container').length).toEqual(1);
    });

    it('Carousel component should have h3 tag with text "Loading", when loading is true', () => {
        const wrapper = mount(<Carousel />);
        wrapper.setState({ 'loading': true });
        expect(wrapper.find('.loader-container > h3').text()).toContain('Loading');
    });

    it('fetches data from server when server returns a successful response', done => {
        const mockSuccessResponse = {
            'hits': [
                {
                    user: "peter_pyw",
                    userImageURL: "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg",
                    id: 1
                }
            ]
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const wrapper = shallow(<Carousel />);

        expect(global.fetch).toHaveBeenCalledTimes(1);

        const key = Constants.API_KEY;
        const url = `${Constants.IMAGES_URL}${key}&q=beautiful+landscape&image_type=photo`;

        expect(global.fetch).toHaveBeenCalledWith(url, { mode: 'cors' });

        process.nextTick(() => {
            expect(wrapper.state()).toEqual({
                imgData: [{
                    title: "peter_pyw",
                    url: "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg",
                    id: 1
                }],
                currentImageIndex: 0,
                currentImageArray: [{
                    title: "peter_pyw",
                    url: "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg",
                    id: 1
                }],
                loading: false,
                width: 1024,
                error: false
            });

            global.fetch.mockClear();
            done();
        });
    });
});


