package com.example.speedyprintserver.REPOSITORY.Commande;

import com.example.speedyprintserver.ENTITY.Commande.Commande;
import com.example.speedyprintserver.ENTITY.Service.Service;
import com.example.speedyprintserver.ENTITY.User.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande,Integer> {

    @Query(value = "SELECT c FROM Commande c ORDER BY c.idCommande DESC LIMIT 1")
    Commande findLastCreated();
    List<Commande> findByClientOrderByIdCommandeDesc(Client client);
    List<Commande> findByService(Service service);

    List<Commande> findByDateLivraison(LocalDate localDate);

    List<Commande> findByDateCreation(LocalDate localDate);

    List<Commande> findByOrigin(Boolean origin);
    Long countByOrigin(Boolean origin);
    @Query(value = "SELECT s.intitule FROM Commande c JOIN c.service s GROUP BY s")
    List<String> findNameCommandeGroupByService();

    @Query(value = "SELECT COUNT(c) FROM Commande c JOIN c.service s GROUP BY s")
    List<Integer> findCountCommandeGroupByService();

    @Query(value = "SELECT s.intitule FROM Commande c JOIN c.service s GROUP BY s")
    List<String> listIntituleServiceCommandeGroupByMonth();

    @Query(value = "SELECT COUNT(s) FROM Commande c JOIN c.service s GROUP BY s")
    List<Long> listQteServiceCommandeGroupByMonth();

    @Query(value = "SELECT COUNT(*) FROM Commande c JOIN c.service s GROUP BY MONTH(c.dateCreation)")
    List<Long> listCountByMonth();
    @Query(value = "SELECT MONTHNAME(c.dateCreation) FROM Commande c JOIN c.service s GROUP BY MONTH(c.dateCreation)")
    List<String> listByMonthName();



}
