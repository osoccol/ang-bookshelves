export class Music {
  
  album: string;
  photo: string;

  constructor(public title: string,
              public artist: string,
              public releaseDate: string){
              }

  setAlbum(album: string){
    this.album = album;
  }
  getAlbum(){
    return this.album;
  }
}