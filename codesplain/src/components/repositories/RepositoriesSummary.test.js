import {screen, render} from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

test('displays information about the repository', ()=>{
    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1
    }
    render(<RepositoriesSummary repository={repository}/>)

    // const language = screen.getByText('Javascript');
    // const stars = screen.getByText(5);
    // expect(language).toBeInTheDocument();
    // expect(stars).toBeInTheDocument();

    for(let key in repository) {
        const val = repository[key];
        const element = screen.getByText(new RegExp(val)); //finds all text inside an element, not only a part of it

        expect(element).toBeInTheDocument();
    }
})