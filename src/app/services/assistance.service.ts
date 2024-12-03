import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AssistanceService {
  constructor(private firestore: AngularFirestore) {}

  updateAssistanceAndRate(email: string, newAssistance: number, newAttendanceRate: number) {
    return this.firestore
      .collection('estudiantes', (ref) => ref.where('email', '==', email))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore
            .collection('estudiantes')
            .doc(doc.id)
            .update({
              assistance: newAssistance,
              attendanceRate: newAttendanceRate
            });
        });
      });
  }
}
