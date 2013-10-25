<!--TODO-->
<td><%= firstName %></td>
<td><%= lastName %></td>
<td>
	<button class="btn btn-info js-edit" data-id="<%= id %>"><i class="icon-edit icon-white"></i> Modifier</button>
	<button class="btn btn-danger js-delete" style="margin-left:10px;" data-id="<%= id %>"><i class="icon-remove icon-white"></i> Supprimer</button>
</td>