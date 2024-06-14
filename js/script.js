'use strict';
// 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
// новый фильм добавляется в список. Страница не должна перезагружаться.
// Новый фильм должен добавляться в movieDB.movies.
// Для получения доступа к значению input - обращаемся к нему как input.value;
// P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

// 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

// 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

// 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
// "Добавляем любимый фильм"

// 5) Фильмы должны быть отсортированы по алфавиту */

document.addEventListener('DOMContentLoaded', () => {
    let movieDB = {
        movies: []
    }
    const imgAdv = document.querySelectorAll('.promo__adv img'),
        filmBG = document.querySelector('.promo__bg'),
        filmGenre = filmBG.querySelector('.promo__genre'),
        addForm = document.querySelector('form.add'),
        input = addForm.querySelector('.adding__input'),
        checkBox = addForm.querySelector('[type="checkbox"]'),
        movieList = document.querySelector('.promo__interactive-list'),
        movieItems = document.querySelectorAll('.promo__interactive-item');

    function deleteAdv(data) {
        data.forEach(item => {
            item.remove();
        })
    }

    function addMoviesToMovieDB(data, list) {
        list.forEach(item => {
            data.push(item.innerText);
        })
    }

    addMoviesToMovieDB(movieDB.movies, movieItems);
    function changeFilm(parent, child) {
        parent.style.cssText = 'background-image: url(img/bg.jpg)'
        child.textContent = 'драма';
    }

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputValue = input.value;
        let checker = checkBox.checked;
        if (checker == true && inputValue) {

            if (inputValue.length <= 21) {
                movieDB.movies.push(inputValue);
                console.log('Добавляем любимый фильм');
                movieDB.movies.sort();
                changeFilmList(movieDB.movies, movieList);
            } else {
                movieDB.movies.push(inputValue.slice(0, 22) + '...');
                console.log('Добавляем любимый фильм');
                movieDB.movies.sort();
                changeFilmList(movieDB.movies, movieList);
            }
        } else if (checker != true && inputValue) {
            if (inputValue.length <= 21) {
                movieDB.movies.push(inputValue);
                movieDB.movies.sort();
                changeFilmList(movieDB.movies, movieList);
            } else {
                movieDB.movies.push(inputValue.slice(0, 22) + '...');
                movieDB.movies.sort();
                changeFilmList(movieDB.movies, movieList);
            }
        }
    });

function changeFilmList(mov, list) {
    list.innerHTML = '';
    mov.forEach((item, i) => {
        list.innerHTML += `
                    <li class="promo__interactive-item">${i + 1} ${item}
                        <div class="delete"></div>
                    </li>
                    `
    })

    document.querySelectorAll('.delete').forEach((item, i) => {
        item.addEventListener('click', () => {
            item.parentElement.remove();
            movieDB.movies.splice(i, 1);

            changeFilmList(movieDB.movies, movieList);
        })
    })
}

// functions
deleteAdv(imgAdv);
changeFilm(filmBG, filmGenre);
changeFilmList(movieDB.movies, movieList);
})