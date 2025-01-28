import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="landing-container">
        <h1>Revendeur Officiel NVIDIA</h1>
        <p>Les meilleures cartes graphiques pour gamer et professionnel</p>
      <section id="produits" class="produits">
        <h2>Nos Cartes Graphiques NVIDIA</h2>
      </section>
    </div>
  `,
})
export class LandingPage implements OnInit {
    produits = [
    {
      nom: 'Carte NVIDIA GTX 1660',
      description: 'Idéale pour les joueurs en 1080p avec des performances exceptionnelles.',
      image: 'https://example.com/gtx-graphics-card.jpg',
    },
    {
      nom: 'Carte NVIDIA RTX 3080',
      description: 'Carte de rêve pour les gamers et les professionnels exigeants.',
      image: 'https://example.com/rtx-graphics-card.jpg',
    },
    {
      nom: 'Carte NVIDIA RTX 4090',
      description: 'Performances inégalées en 4K, VR et rendu graphique.',
      image: 'https://example.com/rtx-4090-graphics-card.jpg',
    }
  ];

  ngOnInit(): void {
    // Initialisation des données si nécessaire
  }

  // Fonction pour défiler vers la section produits
  scrollToProducts() {
    const produitsSection = document.getElementById('produits');
    if (produitsSection) {
      produitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Fonction d'achat (simulée)
  acheter(produit: any) {
    alert(`Vous avez ajouté ${produit.nom} à votre panier.`);
  }
}