class GitHub {
  constructor() {
    this.client_id = "f84b379b1fffbcd390d4";
    this.client_secret = "1a0c0602bccdd30d4ff4aa3d31a5461e0df06035";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();

    return {
      profile,
    };
  }
}
