\connect silverspoon;

\truncate restaurants, reservations;

\COPY restaurants from '/Users/MatBagnall/Desktop/matHr/Immersive/senior-portion/npm-sqrd-SDC/reservations-comp/infoListData.csv' with CSV;

\COPY reservations(restaurantid, date, time, name, party) from '/Users/MatBagnall/Desktop/matHr/Immersive/senior-portion/npm-sqrd-SDC/reservations-comp/reservationData.csv' with CSV;

CREATE INDEX reservations_restaurantid_index on reservations (restaurantid);