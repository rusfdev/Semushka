<?
  require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
  $APPLICATION->SetPageProperty("Title", "Звоните нам!");
  $APPLICATION->SetPageProperty("description", "Контакты оптовых точек ООО Семушка.");
  $APPLICATION->SetTitle("Контакты");
?>

  <section class="section map-section">
    <div class="section__head container">
      <h1 class="section__title">Контакты</h1>
    </div>
    <?$APPLICATION->IncludeComponent(
      "bitrix:main.include",
      "",
      Array(
          "AREA_FILE_SHOW" => "file",
          "AREA_FILE_SUFFIX" => "inc",
          "EDIT_TEMPLATE" => "",
          "PATH" => "/bitrix/templates/semushka2_roz/include/ru/parts/adresa_mag.php"
      ),
      false
    );?>
  </section>
  
  <?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    "",
    Array(
        "AREA_FILE_SHOW" => "file",
        "AREA_FILE_SUFFIX" => "inc",
        "EDIT_TEMPLATE" => "",
        "PATH" => "/bitrix/templates/semushka2_roz/include/ru/kontact2.php"
    ),
    false
  );?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>