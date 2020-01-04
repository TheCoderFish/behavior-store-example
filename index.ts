import { interval, timer, BehaviorSubject } from "rxjs";
import { map, tap, take } from "rxjs/operators";

const dateOfBirth = new Date("02/10/1995");

//Init BehaviorSubject with birthDate
const birthdays = new BehaviorSubject(dateOfBirth);

//Subscriber get the default value immediately on subscription
birthdays.subscribe(bday => console.log(bday.toDateString()));

//Suppose One Sec is Equivalent to One Year
//Will emit the birthdate of next year every One sec
//will stop after 5 birthdays are emitted due to take(5)
interval(1000)
  .pipe(
    tap(() => {
      const currentYear = dateOfBirth.getFullYear();
      birthdays.next(new Date(dateOfBirth.setFullYear(currentYear + 1)));
    }),
    take(5)
  )
  .subscribe();

//Will display the current value of the BehaviorSubject which is the last value emitted
//If no values were emitted prior then it return the default value set while initializing
timer(5000)
  .pipe(
    tap(() =>
      console.log(`Current Value ${birthdays.getValue().toDateString()}`)
    ),
    take(1)
  )
  .subscribe();

//Late subscriber gets the last emitted value immediately and will recive new updates as well
timer(6000).pipe(
  tap(() => {
    birthdays.subscribe(bday =>
      console.log(`I will get the last emitted value ${bday.toDateString()}`)
    );
  }),
  take(1)
).subscribe();
