import { Pipe, PipeTransform } from '@angular/core';
import { Team } from 'src/app/tournaments/interfaces/team.interfece';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(team: Team): string {
    if (!team.logo) return 'assets/logoTorneo.png';
    if (team.logo) return team.logo;
    return `assets/logo.png`
  }

}
